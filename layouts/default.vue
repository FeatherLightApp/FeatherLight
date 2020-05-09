<template lang="pug">
  v-app
    v-app-bar(app)
      v-toolbar-title
        | Lumen Wallet
      v-spacer
      v-menu(bottom fixed)
        template(v-slot:activator='{ on:menu }')
          v-tooltip(bottom)
            template(v-slot:activator='{ on:tooltip }')
              v-hover(v-slot:default='{ hover }')
                v-btn(
                  :color='hover ? "primary" : ""'
                  :loading='settingsStore.loading'
                  v-on='{ ...tooltip, ...menu }'
                  text
                ).mx-3 {{ settingsStore.currency }}
                  v-icon {{icon}}
            | Change currency
        v-list
          v-list-item(
            v-for='(cur, i) in settingsStore.currencies'
            :key='i'
            @click='settingsStore.changeCurrency(cur)'
          ) {{ cur }}
      v-tooltip(bottom)
        template(v-slot:activator='{ on }')
          v-hover(v-slot:default='{ hover }')
            v-icon(:color='hover ? "primary": ""' v-on='on' @click='mutate').mx-3 mdi-logout
        | Logout
    v-content
      v-container
        v-row(justify='center' align='start')
          nuxt
    core-footer
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { settingsStore, authStore } from '~/store'
import { Currency } from '~/types/currency'
import { useLogoutMutation } from '~/types/ApiTypes'

export default defineComponent({
  components: {
    CoreFooter: () => import('~/components/core/Footer.vue')
  },
  setup (_, {root}) {
    const { mutate, onDone } = useLogoutMutation()
    const icon = computed(() => {
      switch(settingsStore.currency) {
        case Currency.sats:
          return 'mdi-currency-btc'
        case Currency.JPY:
          return 'mdi-currency-jpy'
        case Currency.EUR:
          return 'mdi-currency-eur'
        case Currency.GBP:
          return 'mdi-currency-gbp'
        default:
          return 'mdi-currency-usd'
      }
    })

    // @ts-ignore
    onDone((res) => {
      if (res && res.data) {
        authStore.LOGOUT(res.data)
        root.$router.push('/')
      }
    })

    return {
      icon,
      settingsStore,
      mutate
    }
  }
})
</script>