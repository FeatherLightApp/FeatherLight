<template lang="pug">
  v-app
    v-app-bar(app)
      v-toolbar-title.font-weight-light
        | FeatherLight
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
      v-dialog(v-if='showAccount' width='500')
        template(v-slot:activator='{ on: dialog }')
          v-tooltip(bottom)
            template(v-slot:activator='{ on: tooltip }')
              v-hover(v-slot:default='{ hover }')
                v-icon(:color='hover ? "primary": ""' v-on='{...tooltip, ...dialog, ...hover}').mx-3#logout mdi-account-settings
            | Settings
        account-settings
    v-content
      v-container(fluid)
        v-row(justify='center' align='start')
          nuxt
    core-footer

</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { settingsStore } from '~/store'
import { Currency } from '~/types/currency'

export default defineComponent({
  components: {
    CoreFooter: () => import('~/components/core/Footer.vue'),
    AccountSettings: () => import('~/components/AccountSettings.vue')
  },
  setup (_, {root}) {
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
    const showAccount = computed(() => root.$nuxt.$route.name != 'addinvoice-macaroon')

    return {
      icon,
      settingsStore,
      showAccount
    }
  }
})
</script>