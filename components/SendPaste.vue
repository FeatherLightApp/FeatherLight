<template lang="pug">
  v-container.pb-0
    v-row
      v-col(cols='12').pb-0
        v-text-field(v-model='payReq' outlined placeholder='Paste Payment Request')
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { walletStore } from '../store'

export default defineComponent({
  setup () {

    const payReq = computed({
      get: () => walletStore.paymentReq,
      set: (v: string) => walletStore.PAYMENT_REQ(v)
    })
    
    return {
      payReq
    }
  }
})
</script>