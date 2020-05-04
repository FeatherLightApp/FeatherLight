<template lang="pug">
  v-container(fluid)
    v-col.text-center
      qrcode-vue(:value='code' size="200" background="#33333d" foreground='#1EB980')
      v-tooltip(top)
        template(v-slot:activator='{ on }')
          div(v-on='on' @click='copy(code)').mt-3
            | {{ code }}
        | {{ isCopied ? 'Copied to clipboard!' : 'Click to copy' }}


</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { walletStore } from '~/store'
import useClipboard from '~/composition/useClipboard'

export default defineComponent({
  name: 'display-code',
  props: {
    code: {
      type: String,
      required: true
    }
  },
  components: {
    QrcodeVue: () => import('qrcode.vue')
  },
  setup (props) {
    const { isCopied, copy } = useClipboard()
    return {
      isCopied,
      copy
    }
  }
})
</script>