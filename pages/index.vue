<template lang="pug">
  v-fade-transition
    component(:is='component')
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
  setup () {
    const component = computed(() => {
      if (authStore.isAuthenticated && !authStore.confirmRecovery) {
        return 'main-wallet'
      } else {
        return 'start'
      }
    })


    return {
      component
    }
  }
})
</script>