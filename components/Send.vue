<template lang="pug">
  v-container
    v-tabs(v-model='method' centered)
      v-tab
        | QR Code
      v-tab
        | Paste

    v-expand-transition(mode='out-in')
      keep-alive
        component(:is='computedComponent' @payReq='decodeInvoice')
    v-expand-transition(mode='out-in')
      show-payment-details(v-if='result' :payReq='result')
</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import  useValidation from '~/composition/useValidation'
import { settingsStore } from '~/store'
import { useAddInvoiceMutation, useDecodeInvoiceQuery } from '~/types/ApiTypes'


export default defineComponent({
  name: 'send',
  components: {
    SendQr: () => import('~/components/SendQR.vue'),
    SendPaste: () => import('~/components/SendPaste.vue')
  },
  setup () {
    const qrcode = ref('')
    const options = computed(() => ({
      enabled: !!qrcode.value
    }))
    const { result } = useDecodeInvoiceQuery(
      ()=>({ inv: qrcode.value }),
      options.value
    )

    function decodeInvoice (code: string) {
      qrcode.value = code
    }

    const computedComponent = computed(() => (method.value == 0) ? 'send-qr' : 'send-paste')
    const method = ref(0)
    

    return {
      method,
      computedComponent,
      decodeInvoice,
      result
    }
  }
})
</script>