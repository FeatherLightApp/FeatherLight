<template lang="pug">
  v-container
    v-tabs(v-model='method' centered)
      v-tab(@click='vibrate(200)')
        | Lightning
      v-tab(@click='vibrate(200)')
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
import useVibrate from '~/composition/useVibrate'
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
    const { vibrate } = useVibrate()
    return {
      method,
      computedComponent,
      btcAddress,
      vibrate
    }
  }
})
</script>