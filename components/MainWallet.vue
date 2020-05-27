<template lang="pug">
  v-container(fluid)
    v-row(justify="center")
      v-col(cols="11" lg='9' xl='7')
        v-container.px-0
          v-card
            v-progress-linear(v-if='loading' stream buffer-value='0' color="quaternary" absolute top)
            v-container
              v-row(justify='end')
                v-col(cols='auto').text-left.overline.py-0
                  v-dialog(max-width='500')
                    template(v-slot:activator='{ on }')
                      v-btn(text v-on='on') {{walletStore.network}}
                    v-card
                      v-card-text
                        | FeatherLight API v{{walletStore.version}} running on {{ walletStore.network }} using endpoint&nbsp;
                        a(:href='endpoint') {{endpoint}}
                        br
                        br
                        | Wallet created {{ epochToHuman(walletStore.created) }} 
                v-col(cols='12' style='font-family: "Eczar", sans-serif !important;').text-center.primary--text.display-3
                  | {{ value }}
                  span(v-if='walletStore.created').overline.white--text
                    |&nbsp;{{ settingsStore.currency }}
            v-tabs(v-model='tab' fixed-tabs :icons-and-text='$vuetify.breakpoint.mdAndUp')
              v-tab(v-for='item in items' :key='item.text' @click='vibrate(200)')
                span.hidden-xs-only {{ item.name }}
                v-icon.mb-1.hidden-sm-only {{ item.icon }}
            div.hidden-sm-and-up
              v-divider(light)
              div.mobile-header.text-center.my-3 {{items[tab].name}}
            v-divider(light)
            v-tabs-items(v-model='tab')
              v-tab-item(v-for='item in items' :key='item.text')
                component(:is='item.name' :ref='item.name')
            
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from '@vue/composition-api'
import { useMeQuery } from '~/types/ApiTypes'
import { settingsStore, walletStore } from '~/store'
import useCurrencyRounding from '~/composition/useCurrencyRounding'
import useDateConversion from '~/composition/useDateConversion'
import useVibrate from '~/composition/useVibrate'
import useEndpoint from '~/composition/useEndpoint'

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
      { name: 'send', icon: 'mdi-cash-minus', },
      { name: 'transactions', icon: 'mdi-history' },
      { name: 'receive', icon: 'mdi-cash-plus' }
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

    const transactions = ref<HTMLElement>(null)

    watch(tab, () => {
      if (tab.value == 1 && transactions.value) {
        // @ts-ignore
        transactions.value[0].refetch()
      }
    })

    const { vibrate } = useVibrate()
    const { getEndpoint } = useEndpoint()
    const endpoint = getEndpoint()

    return {
      loading,
      tab,
      items,
      settingsStore,
      walletStore,
      value,
      transactions,
      epochToHuman,
      vibrate,
      endpoint
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