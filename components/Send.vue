<template lang="pug">
  v-container
    v-row
      v-col(cols='12')
        v-fade-transition(mode='out-in')
          qrcode-stream(v-if='mountScanner' @init='onInit' key='0')
          v-container(v-else key='1')
            v-row
              v-col.text-center
                span.quaternary--text Could not access QR code scanner
              v-col(cols='12')
                v-file-input(@change='readCode' type='file' name='image' accept='image/*' capture='environment')
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { walletStore } from '~/store'
import { processFile } from 'vue-qrcode-reader'


interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export default defineComponent({
  name: 'send',
  components: {
    QrcodeStream: async () => {
      const { QrcodeStream } = await import('vue-qrcode-reader')
      return QrcodeStream
    }
  },
  setup () {
    // set loading animation while scanner support is determined
    walletStore.LOADING(true)

    const mountScanner = ref(true)
    async function onInit(p: Promise<any>) {
      try {
        await p
      } catch (error) {
        mountScanner.value = false
      } finally {
        walletStore.LOADING(false)
      }
    }

    async function readCode(event: HTMLInputEvent) {
      if (event) {
      console.log({event})
        const res = await processFile(event)
        console.log({res})
        return res
      }
    }

    return {
      mountScanner,
      onInit,
      readCode
    }
  }
})
</script>