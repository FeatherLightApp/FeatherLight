<template lang="pug">
  v-container
    v-row(justify='center')
      v-col(cols='12').text-center.display-2.primary--text.text-break
        v-tooltip(top)
          template(v-slot:activator='{ on }')
            div(v-on='on' @click='copy(recoveryKey)')
              | {{recoveryKey}}
          | {{ isCopied ? 'Copied to clipboard!' : 'Click to copy'}}
      v-col(cols='12').text-center
        | Write this down in a safe place. You will need it to recover your wallet
      v-col(cols='12')
        v-btn(block x-large ripple to='/') I have written down my recovery key
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from '@vue/composition-api'
import { authStore } from '~/store'
import useClipboard from '~/composition/useClipboard'

export default defineComponent({
  middleware: ['assertAuthed', 'assertNewUser'],
  layout: 'plain',
  setup () {
    const recoveryKey = computed(() => `${authStore.username}:${authStore.password}`)
    const { isCopied, copy } = useClipboard()

    console.log('created')

    onMounted(() => console.log('mounted'))
    return {
      recoveryKey,
      isCopied,
      copy
    }
  }
})
</script>