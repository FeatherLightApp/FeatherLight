<template lang="pug">
  v-container(fluid)
    v-row(justify='center')
      v-col(cols='11' lg='9' xl='7').text-center.display-2.primary--text.text-break
        v-tooltip(top)
          template(v-slot:activator='{ on }')
            div(v-on='on' @click='copy(recoveryKey)')
              | {{recoveryKey}}
          | {{ isCopied ? 'Copied to clipboard!' : 'Click to copy'}}
      v-col(cols='11' lg='9' xl='7').text-center
        | Write this down in a safe place immediately. You will need it to recover your wallet. This is the only time the information can be displayed.
      v-col(cols='11' lg='9' xl='7')
        v-btn(block x-large ripple @click="confirm") Continue
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from '@vue/composition-api'
import { authStore } from '~/store'
import useClipboard from '~/composition/useClipboard'

export default defineComponent({
  // loading auth unesscary since this route is only possible when auth has been loaded previously
  middleware: ['assertAuthed', 'assertNewUser'],
  layout: 'plain',
  setup (_, {root}) {
    const recoveryKey = computed(() => `${authStore.username}:${authStore.password}`)
    const { isCopied, copy } = useClipboard()

    console.log('created')
    
    function confirm () {
      authStore.DONE_CONFIRM()
      root.$router.push('/')
    }

    onMounted(() => console.log('mounted'))
    return {
      recoveryKey,
      isCopied,
      copy,
      confirm
    }
  }
})
</script>