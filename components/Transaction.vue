<template lang="pug">
  v-container
    v-row
      v-col
        v-list
          v-list-item(v-for='item in feed' :key='item.key' hover)
            v-list-item-icon
              v-icon(v-text='(item.__typename == "PaidInvoice") ? "mdi-cash-minus" : "mdi-cash-plus"' :color='item.color')
            v-list-item-content
              v-list-item-title(:class='[`${item.color}--text`]').title.font-weight-light
                v-container
                  v-row(justify='space-between')
                    div
                      | {{translate(item.amount)}} 
                      span.white--text.overline
                        | {{settingsStore.currency}}
                    div.caption
                      |{{item.typeDesc}}
              v-list-item-subtitle
                | {{item.comment || item.memo}}
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { walletStore, settingsStore } from '~/store'
import { useFeedQuery, UserInvoice, PaidInvoice, Deposit } from '~/types/ApiTypes'
import useCurrencyRounding from '~/composition/useCurrencyRounding'
import useDateConversion from '~/composition/useDateConversion'

export default defineComponent({
  setup () {
    const { loading, onResult } = useFeedQuery()
    const { translate } = useCurrencyRounding()
    const { epochToHuman } = useDateConversion()

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

    onResult((res) => {
      if (res && res.data) {
        walletStore.FEED(res.data)
      }
    })

    return {
      feed,
      settingsStore,
      translate,
      epochToHuman
    }
  }
})
</script>