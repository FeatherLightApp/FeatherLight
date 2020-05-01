<template lang="pug">
  v-container
    v-row
      v-col(cols='12')
        v-text-field(v-model='payReq' outlined)
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