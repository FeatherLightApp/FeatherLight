<template lang="pug">
  v-container.py-0
    v-row
      v-col(cols='12').py-0
        v-fade-transition(mode='out-in')
          qrcode-stream(v-if='mountScanner' @init='onInit' key='0' @decode='onDecode')
          v-container(v-else key='1').pb-0
            v-row
              v-col.text-center.pb-0
                span.quaternary--text Could not access QR code scanner
              v-col(cols='12').pb-0
                v-file-input(@change='readCode' type='file' name='image' accept='image/*' capture='environment' outlined label='Choose QR Code')
</template>
<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { walletStore } from '~/store'
import { processFile } from 'vue-qrcode-reader'


interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export default defineComponent({
  name: 'SendQr',
  props: {
    loading: {
      type: Boolean
    }
  },
  components: {
    QrcodeStream: async () => {
      const { QrcodeStream } = await import('vue-qrcode-reader')
      return QrcodeStream
    }
  },
  setup (_, {emit}) {
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
        const res = await processFile(event)
        console.log({res})
        if (res.content) {
          emit('payReq', res.content)
        }
      }
    }

    function onDecode (decoded: string) {
      emit('payReq', decoded)
    }

    return {
      mountScanner,
      onInit,
      readCode,
      onDecode
    }
  }
})
</script>