<template lang="pug">
  v-fade-transition
    component(:is='authenticated ? "main-wallet" : "start"')
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
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
  setup () {
    const authenticated = computed(() => authStore.isAuthenticated)

    return {
      authenticated
    }
  }
})
</script>