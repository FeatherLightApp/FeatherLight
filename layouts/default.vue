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
      v-dialog(width='500')
        template(v-slot:activator='{ on: dialog }')
          v-tooltip(bottom)
            template(v-slot:activator='{ on: tooltip }')
              v-hover(v-slot:default='{ hover }')
                v-icon(:color='hover ? "primary": ""' v-on='{...tooltip, ...dialog, ...hover}').mx-3#logout mdi-logout
            | Logout
        v-card
          v-card-title Confirm Logout
          v-card-text.
            Once you logout you will need your recovery key to access this wallet.
            Loging out of every device will invalidate any add-invoice links you have created.
          v-card-actions
            v-btn(@click='mutate({universal: false})') Logout of this device
            v-btn(@click='mutate({universal: true})') Logout of all devices
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
      console.log({res})
      if (res && res.data) {
        authStore.LOGOUT(res.data)
        location.reload()
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