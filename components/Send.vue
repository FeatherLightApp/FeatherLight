<template lang="pug">
  v-container
    v-progress-linear(v-if='loading' stream buffer-value='0' color="quaternary" absolute top)
    v-tabs(v-model='method' centered)
      v-tab
        | QR Code
      v-tab
        | Paste

    v-expand-transition(mode='out-in')
      keep-alive
        component(:is='computedComponent' @payReq='decodeInvoice')
    div(v-if='result && !result.decodeInvoice').tertiary--text.text-center Invalid Payment Request
    v-expand-transition(mode='out-in')
      div(v-if='result && result.decodeInvoice')
        show-payment-details(:payReq='result.decodeInvoice')
        v-btn(block @click='').my-3 Send Payment
</template>
<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from '@vue/composition-api'
import  useValidation from '~/composition/useValidation'
import { settingsStore, walletStore } from '~/store'
import { useAddInvoiceMutation, useDecodeInvoiceQuery } from '~/types/ApiTypes'


export default defineComponent({
  name: 'send',
  components: {
    SendQr: () => import('~/components/SendQR.vue'),
    SendPaste: () => import('~/components/SendPaste.vue'),
    ShowPaymentDetails: () => import('~/components/ShowPaymentDetails.vue')
  },
  setup () {
    const qrcode = ref('')

    const variables = computed(() => ({
      inv: qrcode.value
    }))
    const options = computed(() => ({
      enabled: !!qrcode.value
    }))
    // @ts-ignore
    const { result, loading } = useDecodeInvoiceQuery(variables, options)

    function decodeInvoice (code: string) {
      qrcode.value = code
    }

    const computedComponent = computed(() => (method.value == 0) ? 'send-qr' : 'send-paste')
    const method = ref(0)
    

    return {
      method,
      computedComponent,
      decodeInvoice,
      result,
      loading
    }
  }
})
</script>