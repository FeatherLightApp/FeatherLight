<template lang="pug">
  v-card
    v-progress-linear(v-if='loading || walletStore.loading' stream buffer-value='0' color="quaternary" absolute top)
    v-container
      v-row(justify='center')
        v-col(cols='12').text-right.overline.py-0
          | Created: {{ walletStore.created }} 
        v-col(cols='12').text-center.primary--text.display-3
          | {{ value }}
          span(v-if='walletStore.created').overline.white--text
            |&nbsp;{{ settingsStore.currency }}
    v-tabs(v-model='tab' fixed-tabs)
      v-tab(v-for='item in items' :key='item')
        |{{ item }}
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

export default defineComponent({
  components: {
    Receive: () => import('~/components/Receive.vue'),
    Transactions: () => import('~/components/Transaction.vue'),
    Send: () => import('~/components/Send.vue')
  },
  setup () {
    const { loading, onResult } = useMeQuery()
    const { value } = useCurrencyRounding()

    const tab = ref(1)
    const items = ref(['send', 'transactions', 'receive'])
    onResult((res) => {
      if (res) {
        walletStore.ME(res.data)
      }
    })

    const computedComponent = computed(() => {
      if (tab.value == 0) {
        return 'send'
      } else if (tab.value == 1 && !loading.value) {
        return 'transactions'
      } else if (tab.value == 2) {
        return 'receive'
      }
    })

    const activeElem = ref<HTMLElement>(null)

    watch(activeElem => {
      if (computedComponent.value == 'transactions') {
        // @ts-ignore
        activeElem.refetch()
      }
    })

    return {
      loading,
      tab,
      items,
      settingsStore,
      walletStore,
      value,
      computedComponent,
      activeElem
    }
  }
})
</script>