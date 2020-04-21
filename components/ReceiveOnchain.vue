<template lang="pug">
  v-container(fluid)
    v-col.text-center
      qrcode-vue(:value='address' size="200" background="#33333d" foreground='#1EB980')
      v-tooltip(top)
        template(v-slot:activator='{ on }')
          div(v-on='on' @click='copy(address)').mt-3
            | {{ address }}
        | {{ isCopied ? 'Copied to clipboard!' : 'Click to copy' }}


</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { walletStore } from '~/store'
import useClipboard from '~/composition/useClipboard'

export default defineComponent({
  components: {
    QrcodeVue: () => import('qrcode.vue')
  },
  setup () {
    const { isCopied, copy } = useClipboard()
    const address = computed(() => walletStore.btcAddress)
    return {
      address,
      isCopied,
      copy
    }
  }
})
</script>