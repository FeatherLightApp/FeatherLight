<template lang="pug">
  v-container(v-intersect='onIntersect').py-0
    v-row
      v-col(cols='12').py-0
        v-fade-transition(mode='out-in')
          qrcode-stream(v-if='mountScanner' @init='onInit' key='0' @decode='onDecode')
          v-container(v-else key='1').pb-0
            v-row
              v-col.text-center.pb-0
                span.quaternary--text Could not access QR code scanner
              v-col(cols='12').pb-0
                v-file-input(@change='readCode' type='file' name='image' accept='image/*' capture='environment' outlined label='Upload QR Code')
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from '@vue/composition-api'
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
  setup () {
    // set loading animation while scanner support is determined
    const loading = ref(true)

    const mountScanner = ref(true)
    async function onInit(p: Promise<any>) {
      console.log('scanner init')
      try {
        await p
      } catch (error) {
        mountScanner.value = false
      } finally {
        loading.value = false
      }
    }

    async function readCode(event: HTMLInputEvent) {
      if (event) {
        const res = await processFile(event)
        console.log({res})
        if (res.content) {
          walletStore.PAYMENT_REQ(res.content)
        }
      }
    }

    function onDecode (decoded: string) {
      walletStore.PAYMENT_REQ(decoded)
    }

    function onIntersect (entries: any, observer: any) {
      mountScanner.value = entries[0].isIntersecting
    } 

    return {
      mountScanner,
      onInit,
      readCode,
      onDecode,
      loading,
      onIntersect
    }
  }
})
</script>