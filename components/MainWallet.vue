<template lang="pug">
  v-card
    v-progress-linear(v-if='loading' stream buffer-value='0' color="quaternary" absolute top)
    v-container
      v-row(justify='center')
        v-col(cols='12').text-right.overline.py-0
          | Created: {{ epochToHuman(walletStore.created) }} 
        v-col(cols='12').text-center.primary--text.display-3
          | {{ value }}
          span(v-if='walletStore.created').overline.white--text
            |&nbsp;{{ settingsStore.currency }}
    v-tabs(v-model='tab' fixed-tabs :icons-and-text='$vuetify.breakpoint.mdAndUp')
      v-tab(v-for='item in items' :key='item.text' @click='vibrate(200)')
        span.hidden-xs-only {{ item.text }}
        v-icon.mb-1.hidden-sm-only {{ item.icon }}
    div.hidden-sm-and-up
      v-divider(light)
      div.mobile-header.text-center.my-3 {{computedComponent}}
    v-divider(light)
    v-expand-transition(mode='out-in')
      keep-alive
        component(:is='computedComponent' ref='activeElem')
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from '@vue/composition-api'
import { useMeQuery } from '~/types/ApiTypes'
import { settingsStore, walletStore } from '~/store'
import useCurrencyRounding from '~/composition/useCurrencyRounding'
import useDateConversion from '~/composition/useDateConversion'
import useVibrate from '~/composition/useVibrate'

export default defineComponent({
  components: {
    Receive: () => import('~/components/Receive.vue'),
    Transactions: () => import('~/components/Transaction.vue'),
    Send: () => import('~/components/Send.vue')
  },
  setup () {
    const { loading, onResult } = useMeQuery()
    const { value } = useCurrencyRounding()
    const { epochToHuman } = useDateConversion()

    const items = ref([
      { text: 'send', icon: 'mdi-cash-minus' },
      { text: 'transactions', icon: 'mdi-history' },
      { text: 'receive', icon: 'mdi-cash-plus' }
    ])

    const tab = computed({
      get: () => settingsStore.activeTab,
      set: (v: number) => settingsStore.TAB(v)
    })

    onResult((res) => {
      if (res) {
        walletStore.ME(res.data)
      }
    })

    const computedComponent = computed(() => {
      if (tab.value == 0) {
        return 'send'
      } else if (tab.value == 1) {
        return 'transactions'
      } else if (tab.value == 2) {
        return 'receive'
      }
    })

    const activeElem = ref<HTMLElement>(null)

    watch(activeElem, () => {
      if (computedComponent.value == 'transactions' && activeElem.value) {
        console.log('refetch')
        // @ts-ignore
        activeElem.value.refetch()
      }
    })

    const { vibrate } = useVibrate()

    return {
      loading,
      tab,
      items,
      settingsStore,
      walletStore,
      value,
      computedComponent,
      activeElem,
      epochToHuman,
      vibrate
    }
  }
})
</script>
<style lang="scss" scoped>
.mobile-header {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
}
</style>