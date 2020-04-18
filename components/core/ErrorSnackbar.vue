<template lang="pug">
  v-snackbar(v-model="show" top :timeout="0")
    | {{ error }}
    v-btn( @click="clear" text).tertiary--text Dismiss
    
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { authStore } from '~/store'


export default defineComponent({
  setup () {
    const show = computed(() => !!authStore.errorType)
    const error = computed(() => authStore.errorType)

    function clear () {
      authStore.CLEAR_ERROR()
    }

    return {
      show,
      error,
      clear
    }
  }
})
</script>