<template lang="pug">
  v-container
    v-tabs(v-model='method' centered)
      v-tab
        | Lightning
      v-tab
        | Standard
    v-fade-transition(mode='out-in' hide-on-leave)
      div(v-show='method != 0').quaternary--text.overline.text-center
        | Standard Bitcoin payments are slow and prone to higher fees
    v-expand-transition(mode='out-in')
      keep-alive
        component(:is='computedComponent' :code='btcAddress')

</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import  useValidation from '~/composition/useValidation'
import { settingsStore, walletStore } from '~/store'
import { useAddInvoiceMutation } from '~/types/ApiTypes'

export default defineComponent({
  name: 'receive',
  components: {
    ReceiveLightning: () => import('~/components/ReceiveLightning.vue'),
    DisplayCode: () => import('~/components/DisplayCode.vue')
  },
  setup () {
    const computedComponent = computed(() => method.value == 0 ? 'receive-lightning': 'display-code')
    const method = ref(0)
    const btcAddress = computed(() => walletStore.btcAddress)
    return {
      method,
      computedComponent,
      btcAddress
    }
  }
})
</script>