<template lang="pug">
  v-snackbar(v-model="show" top :timeout="0")
    | {{ errorType }}
    v-btn( @click="clear" text).tertiary--text.text-right Dismiss
    
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import useErrorHandler from '~/composition/useErrorHandler'

export default defineComponent({
  name: 'error-snackbar',
  setup () {
    const { errorMessage, errorType, clear } = useErrorHandler()
    const show = computed(() => !!errorType.value)

    return {
      show,
      errorType,
      clear
    }
  }
})
</script>