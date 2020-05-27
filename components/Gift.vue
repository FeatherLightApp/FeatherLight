<template lang="pug">
  v-card
    v-card-title Gift a Preloaded Wallet (coming soon)
    v-card-text
      | Have friends who should start &nbsp;
      a(href='https://twitter.com/search?q=%23stackingsats' target="_blank" ) #StackingSats
      | ? Pre-pay for a wallet so they can transact on the lightning network right away!
      br
      br
      | You purchase a ticket which can load sats on a new wallet, but the wallet is not generated until they use the ticket. 
      | This ensures the recovery key is only held by the rightful owner of the wallet.
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup () {

  }
})
</script>