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
        v-btn(block @click='mutate({inv: payReq})' :loading='sending').my-3 Send Payment
        div(v-if='paymentError').tertiary--text {{ paymentError }}
</template>
<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from '@vue/composition-api'
import  useValidation from '~/composition/useValidation'
import { settingsStore, walletStore } from '~/store'
import { useAddInvoiceMutation, useDecodeInvoiceQuery, useSendPaymentMutation } from '~/types/ApiTypes'


export default defineComponent({
  name: 'send',
  components: {
    SendQr: () => import('~/components/SendQR.vue'),
    SendPaste: () => import('~/components/SendPaste.vue'),
    ShowPaymentDetails: () => import('~/components/ShowPaymentDetails.vue')
  },
  setup () {
    const payReq = ref('')
    const paymentError = ref('')

    const variables = computed(() => ({
      inv: payReq.value
    }))
    const options = computed(() => ({
      enabled: !!payReq.value
    }))
    // @ts-ignore
    const { result, loading } = useDecodeInvoiceQuery(variables, options)
    const { mutate, loading: sending, onDone } = useSendPaymentMutation()

    onDone(res => {
      if (!!res && res.data && res.data.payInvoice.__typename == 'Error') {
         paymentError.value = res.data.payInvoice.message
      }
    })

    function decodeInvoice (code: string) {
      console.log({code})
      payReq.value = code
      paymentError.value = ''
    }

    const computedComponent = computed(() => (method.value == 0) ? 'send-qr' : 'send-paste')
    const method = ref(0)
    

    return {
      method,
      computedComponent,
      decodeInvoice,
      result,
      loading,
      payReq,
      sending,
      mutate,
      paymentError
    }
  }
})
</script>