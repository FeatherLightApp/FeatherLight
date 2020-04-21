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
      receive-lightning(v-show='method == 0' key='lightning')
    v-expand-transition(mode='out-in')
      receive-onchain(v-show='method != 0' key='btc')

</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import  useValidation from '~/composition/useValidation'
import { settingsStore } from '~/store'
import { useAddInvoiceMutation } from '~/types/ApiTypes'

export default defineComponent({
  components: {
    ReceiveLightning: () => import('~/components/ReceiveLightning.vue'),
    ReceiveOnchain: () => import('~/components/ReceiveOnchain.vue')
  },
  setup () {

    const method = ref('Lightning')

    return {
      method
    }
  }
})
</script>