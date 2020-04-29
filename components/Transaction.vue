<template lang="pug">
  v-container
    v-row
      v-col
        v-expand-transition(mode='out-in')
          v-expansion-panels(v-if='!storeLoading' flat multiple focusable accordion)
            v-expansion-panel(v-for='item in feed' :key='item.key' hover @click='resetToggle(0)')
              v-expansion-panel-header
                v-container(:class='[`${item.color}--text`]').py-0.title.font-weight-light
                  v-row(align='center' no-gutters).mx-3
                    v-col
                      v-row
                        v-icon(v-text='(item.__typename == "PaidInvoice") ? "mdi-cash-minus" : "mdi-cash-plus"' :color='item.color')
                        div.pl-3
                          | {{translate(item.amount)}} 
                          span.white--text.overline
                            | {{settingsStore.currency}}
                    v-spacer
                    div.overline
                      |{{item.typeDesc}}
              v-expansion-panel-content
                v-simple-table
                  template(v-slot:default)
                    tbody
                      v-tooltip(
                        top
                        v-for='(v, k) in formatItem(item)'
                        :key='k'
                        :open-on-hover='false'
                        :disabled='toggle'
                      )
                        template(v-slot:activator='{ on }')
                          tr(v-on='on' @click='copyTimeout(v)' @mouseout='isCopied=false')
                            td
                              | {{k}}
                            td
                              | {{v}}
                        span
                          | {{ 'Copied!' }}
                      

</template>
<script lang="ts">
import { defineComponent, computed, watchEffect, ref } from '@vue/composition-api'
import { walletStore, settingsStore } from '~/store'
import { useFeedQuery, UserInvoice, PaidInvoice, Deposit } from '~/types/ApiTypes'
import useCurrencyRounding from '~/composition/useCurrencyRounding'
import useDateConversion from '~/composition/useDateConversion'
import useClipboard from '~/composition/useClipboard'

export default defineComponent({
  name: 'transaction',
  setup (_ , {root}) {
    const { loading, onResult } = useFeedQuery()
    const { translate } = useCurrencyRounding()
    const { epochToHuman } = useDateConversion()
    const { copy, isCopied } = useClipboard()
    const toggle = ref(false)

    watchEffect(() => walletStore.LOADING(loading.value))

    function copyTimeout(v: string) {
      copy(v)
      resetToggle(2000)
    }

    function resetToggle(t: number) {
      setTimeout(()=>{
        toggle.value = true
        root.$nextTick(()=>{
          toggle.value = false
        })
      }, t)
    }

    const feed = computed(() => {
      return walletStore.feed.map(e => {
        if (e.__typename == 'Deposit') {
          return Object.assign(e, {
            color: (e.confirmations >= 3) ? 'primary' : 'white',
            key: e.txid,
            typeDesc: 'Onchain Deposit'
          })
        } else if (e.__typename == 'PaidInvoice') {
          return Object.assign(e, {
            color: 'quaternary',
            key: e.paymentHash,
            typeDesc: 'Lightning Payment'
          })
        } else if (e.__typename == 'UserInvoice') {
          return Object.assign(e, {
            color: (e.paid) ? 'primary' : 'white',
            key: e.paymentHash,
            typeDesc: 'Lightning Invoice'
          })
        }
      })
    })

    function formatItem(i: Deposit | UserInvoice | PaidInvoice) {
      if (i.__typename == 'Deposit') {
        const table = {
          Address: i.address,
          Amount: `${translate(i.amount)} ${settingsStore.currency}`,
          Confirmations: i.confirmations,
          'Block Hash': i.blockhash,
          'Block Time': epochToHuman(i.blocktime),
          TxID: i.txid,
          Time: epochToHuman(i.time),
          Received: epochToHuman(i.timereceived)
        }
        if (!!i.comment) {
          return { Comment: i.comment, ...table}
        }
        return table
      }
    }

    const storeLoading = computed(() => walletStore.loading)

    onResult((res) => {
      if (res && res.data) {
        walletStore.FEED(res.data)
      }
    })

    return {
      feed,
      settingsStore,
      translate,
      epochToHuman,
      storeLoading,
      formatItem,
      copyTimeout,
      isCopied,
      toggle,
      resetToggle
    }
  }
})
</script>
