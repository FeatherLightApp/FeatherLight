<template lang="pug">
  v-container
    v-progress-linear(v-if='loading' stream buffer-value='0' color="quaternary" absolute top)
    v-row
      v-col.px-0
        v-expand-transition(mode='out-in')
          v-expansion-panels(v-if='!storeLoading' flat multiple focusable accordion)
            v-expansion-panel(v-for='item in feed' :key='item.key' hover)
              v-expansion-panel-header
                v-container(:class='[`${item.color}--text`]').py-0.title.font-weight-light
                  v-row(align='center')
                    v-icon(v-text='(item.__typename == "PaidInvoice") ? "mdi-cash-minus" : "mdi-cash-plus"' :color='item.color')
                    div.pl-3
                      span(style="font-family: 'Eczar', sans-serif;") {{item.totalAmount}} 
                      span.white--text.overline {{settingsStore.currency}}
                    v-spacer
                    div.overline
                      |{{item.typeDesc}}
              v-expansion-panel-content
                v-simple-table
                  template(v-slot:default)
                    tbody
                      template(v-for='(v, k) in item.table')
                        tr(v-if='typeof(v) == "number" || !!v')
                          td {{k}}
                          copy-td(:text='v')
                      

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
  components: {
    CopyTd: () => import('~/components/core/CopyTd.vue')
  },
  setup (_ , {root}) {
    const { loading, onResult } = useFeedQuery({}, { pollInterval: 5000 })
    const { multiplier, round } = useCurrencyRounding()
    const { epochToHuman } = useDateConversion()
    const { copy, isCopied } = useClipboard()

    watchEffect(() => walletStore.LOADING(loading.value))

    const feed = computed(() => {
      return walletStore.feed.map(e => {
        if (e.__typename == 'Deposit') {
          return Object.assign(e, {
            color: (e.confirmations >= 3) ? 'primary' : 'white',
            key: e.txid,
            typeDesc: 'Onchain Deposit',
            totalAmount: round(e.amount * multiplier.value),
            table: {
              Address: e.address,
              Amount: `${round(e.amount * multiplier.value)} ${settingsStore.currency}`,
              Confirmations: e.confirmations,
              Comment: e.comment,
              'Block Hash': e.blockhash,
              'Block Time': e.blocktime ? epochToHuman(e.blocktime) : null,
              TxID: e.txid,
              Time: epochToHuman(e.time),
              Received: epochToHuman(e.timereceived)
            }
          })
        } else if (e.__typename == 'PaidInvoice') {
          return Object.assign(e, {
            color: 'quaternary',
            key: e.paymentHash,
            typeDesc: 'Lightning Payment',
            totalAmount: round(multiplier.value * (e.amount + e.fee)),
            table: {
              Amount: `${round(multiplier.value * e.amount)} ${settingsStore.currency}`,
              Fee: round(multiplier.value * e.fee),
              Total: round(multiplier.value * (e.amount + e.fee)),
              Memo: e.memo,
              'Paid At': e.paidAt ? epochToHuman(e.paidAt) : '',
              Timestamp: e.timestamp,
              'Payment Hash': e.paymentHash,
              'Preimage': e.paymentPreimage
            }
          })
        } else if (e.__typename == 'UserInvoice') {
          return Object.assign(e, {
            color: (e.paid) ? 'primary' : 'white',
            tooltip: e.paid ? '' : 'This balance will be added to your wallet once the invoice is paid',
            key: e.paymentHash,
            typeDesc: 'Lightning Invoice',
            totalAmount: round(multiplier.value * e.amount),
            table: {
              Amount: `${round(multiplier.value * e.amount)} ${settingsStore.currency}`,
              Status: e.paid ? 'Paid' : 'Not paid',
              Memo: e.memo,
              'Paid At': e.paidAt ? epochToHuman(e.paidAt) : '',
              'Expires At': epochToHuman(e.timestamp + e.expiry),
              Timestamp: epochToHuman(e.timestamp),
              'Payment Request': e.paymentRequest,
              'Payment Hash': e.paymentHash,
              'Preimage': e.paymentPreimage
            }
          })
        }
      })
    })

    const storeLoading = computed(() => walletStore.loading)

    onResult((res) => {
      console.log({res})
      if (res && res.data) {
        walletStore.FEED(res.data)
      }
    })

    return {
      feed,
      settingsStore,
      epochToHuman,
      storeLoading,
      isCopied,
      copy,
      loading
    }
  }
})
</script>
