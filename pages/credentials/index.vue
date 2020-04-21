<template lang="pug">
  v-container
    v-row(justify='center')
      v-col(cols='12').text-center.display-4.primary--text
        | {{recoveryKey}}
      v-col(cols='12').text-center
        | Write this down in a safe place. You will need it to recover your wallet
      v-col(cols='12')
        v-btn(block x-large ripple to='/') I have written down my recovery key
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { authStore } from '~/store'

export default defineComponent({
  middleware: ['assertAuthed', 'assertNewUser'],
  setup () {
    const recoveryKey = computed(() => `${authStore.username}:${authStore.password}`)
    return {
      recoveryKey
    }
  }
})
</script>