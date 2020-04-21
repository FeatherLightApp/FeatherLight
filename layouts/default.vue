<template lang="pug">
  v-app
    error-snackbar
    v-app-bar(app)
      v-toolbar-title
        | Lumen Wallet
      v-spacer
      v-menu
        template(v-slot:activator='{ on:menu }')
          v-tooltip(bottom)
            template(v-slot:activator='{ on:tooltip }')
              v-hover(v-slot:default='{ hover }')
                v-btn(:color='hover ? "primary" : ""' v-on='{ ...tooltip, ...menu }' text).mx-3 {{ settingsStore.currency }}
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
            v-icon(:color='hover ? "primary": ""' v-on='on').mx-3 mdi-logout
        | Logout
    v-content
      v-row(justify='start' justify-lg='start' align='center')#align-row
        nuxt
    footer
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { settingsStore } from '../store'
import { Currency } from '~/types/currency'

export default defineComponent({
  components: {
    Footer: () => import('~/components/core/Footer.vue'),
    ErrorSnackbar: () => import('~/components/core/ErrorSnackbar.vue')
  },
  setup () {
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

    return {
      icon,
      settingsStore
    }
  }
})
</script>
<style lang="scss" scoped>
#align-row {
  height: calc(80%);
}
</style>
