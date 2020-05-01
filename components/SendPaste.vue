<template lang="pug">
  v-container.pb-0
    v-row
      v-col(cols='12').pb-0
        v-text-field(v-model='payReq' outlined placeholder='Paste Payment Request')
</template>
<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

export default defineComponent({
  setup (_, {emit}) {
    const payReq = ref('')

    watch(payReq, () => {
      emit('payReq', payReq.value)
    })
    
    return {
      payReq
    }
  }
})
</script>