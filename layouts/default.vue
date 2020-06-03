<template lang="pug">
  v-app
    v-app-bar(app)
      v-toolbar-title
        v-btn(text to='/').font-weight-light.btn-override.v-toolbar__title
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
      v-tooltip(bottom)
        template(v-slot:activator='{ on: tooltip }')
          v-hover(v-slot:default='{ hover }')
            v-btn(icon to='/gift' v-on='{...tooltip, ...hover}')
              v-icon(:color='hover ? "primary":""' ).mx-3 mdi-gift-outline
        | Gift
      template(v-if='showAccount')
        v-dialog(v-for='item in toolbarItems' :key='item.icon' max-width='800')
          template(v-slot:activator='{ on: dialog }')
            v-tooltip(bottom)
              template(v-slot:activator='{ on: tooltip }')
                v-hover(v-slot:default='{ hover }')
                  v-icon(:color='hover ? "primary": ""' v-on='{...tooltip, ...dialog, ...hover}').mx-3 {{item.icon}}
              | {{ item.tooltip }}
          component(:is='item.dialog')
    v-content
      v-container(fluid)
        v-row(justify='center' align='start')
          nuxt
    core-footer

</template>
<script lang="ts">
import { defineComponent, computed, reactive } from '@vue/composition-api'
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

    const toolbarItems = reactive([
      {tooltip: 'Access Link', icon: 'mdi-link', dialog: 'account-settings'},
      {tooltip: 'Logout', icon: 'mdi-logout', dialog: 'account-settings'}
    ])

    return {
      icon,
      settingsStore,
      showAccount,
      toolbarItems
    }
  }
})
</script>
