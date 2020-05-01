<template lang="pug">
  v-container
    v-row
      v-col(cols='12')
        v-fade-transition(mode='out-in')
          qrcode-stream(v-if='mountScanner' @init='onInit' key='0' @decode='onDecode')
          v-container(v-else key='1')
            v-row
              v-col.text-center
                span.quaternary--text Could not access QR code scanner
              v-col(cols='12')
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
  components: {
    QrcodeStream: async () => {
      const { QrcodeStream } = await import('vue-qrcode-reader')
      return QrcodeStream
    }
  },
  setup (_, {emit}) {
    // set loading animation while scanner support is determined
    walletStore.LOADING(true)

    const payReq = ref('')

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
        payReq.value = res.content || ''
      }
    }

    function onDecode (decoded: string) {
      payReq.value = decoded
    }

    watch(payReq, () => {
      emit('payReq', payReq.value)
    })

    return {
      mountScanner,
      onInit,
      readCode,
      onDecode
    }
  }
})
</script>