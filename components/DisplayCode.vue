<template lang="pug">
  v-container(fluid)
    v-row(justify='center')
      v-sheet(color='white')
        qrcode-vue(:value='code' size="200" style='height: 200px;').ma-2
      v-col(cols='12').text-center
        v-tooltip(top)
          template(v-slot:activator='{ on }')
            div(@click='copy(code)' v-on='on').mt-3
              | {{ code }}
          span {{ isCopied ? 'Copied!' : 'Click to copy' }}


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