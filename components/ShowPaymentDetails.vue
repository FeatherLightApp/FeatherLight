<template lang="pug">
  v-simple-table
    tbody
      template(v-for='(v, k) in table')
        v-tooltip(
          :key='k'
          v-if='!!v && k != "__typename"'
          top
          :open-on-hover='false'
          :disabled='toggle'
        )
          template(v-slot:activator='{ on }')
            tr(v-on='on' @click='copyTimeout(v, $root)' @mouseout='isCopied=false')
              td
                | {{k}}
              td
                | {{v}}
          span
            | {{ 'Copied!' }}
  
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { DecodedInvoice } from '~/types/ApiTypes'
import useClipboard from '~/composition/useClipboard'
import useCurrencyRounding from '~/composition/useCurrencyRounding'
import { settingsStore } from '~/store'
import useDateConversion from '~/composition/useDateConversion'

export default defineComponent({
  props: {
    payReq: {
      type: Object as () => DecodedInvoice,
      required: true
    }
  },
  setup (props) {
    const { isCopied, copyTimeout, toggle } = useClipboard()
    const { round, multiplier } = useCurrencyRounding()
    const { epochToHuman } = useDateConversion()

    const table = computed(()=>({
      Amount: `${round((props.payReq.numSatoshis || 0) * multiplier.value)} ${settingsStore.currency}`,
      Memo: props.payReq.description,
      Destination: props.payReq.destination,
      'Payment Hash': props.payReq.paymentHash,
      'Payment Address': props.payReq.paymentAddr,
      Timestamp: props.payReq.timestamp ? epochToHuman(props.payReq.timestamp) : '',
      'Expires At': (props.payReq.timestamp && props.payReq.expiry) ? epochToHuman(props.payReq.expiry + props.payReq.timestamp) : ''
    }))

    return {
      isCopied,
      copyTimeout,
      toggle,
      table
    }
  }
})
</script>