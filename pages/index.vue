<template lang="pug">
  v-fade-transition
    component(:is='authenticated ? "main-wallet" : "start"')
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from '@vue/composition-api'
import { authStore } from '~/store'
import { Context } from '@nuxt/types'

export default defineComponent({
  middleware: ['loadAuth'],
  components: {
    MainWallet: () => import('~/components/MainWallet.vue'),
    Start: () => import('~/components/Start.vue')
  },
  layout: (context: Context) => {
    if (authStore.isAuthenticated) {
      return 'default'
    } else {
      return 'plain'
    }
  },
  setup (_, {root}) {
    const comp = computed(() => authStore.isAuthenticated)
    const val = comp.value
    const authenticated = ref(val)
    // watcher with timeout avoids two components changing at once which causes bug
    watch(comp, () => {
      setTimeout(()=> authenticated.value = comp.value, 100)
    })

    return {
      authenticated
    }
  }
})
</script>