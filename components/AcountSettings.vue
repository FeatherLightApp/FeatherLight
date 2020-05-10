<template lang="pug">
  v-card
    v-card-title Account Settings
    v-divider
    v-card-text
      | Creating an add-invoice link will allow anyone with the link to create an invoice on your behalf.
      | See 
      nuxt-link(to='/about') about page
      | &nbsp;for more details
    v-card-actions.px-6
      v-fade-transition(mode='out-in')
        div(v-if='shareLink' key='link').text-center
          nuxt-link(:to='`/addinvoice/${macaroon}`').text-break {{shareLink}}
        v-btn(v-else @click='bake' :loading='baking' key='button') Create Link
    v-card-text.
      Once you logout you will need your recovery key to access this wallet.
      Loging out of every device will invalidate any add-invoice links you have created.
    v-card-actions.px-6
      v-btn(@click='mutate({universal: false})') Logout of this device
      v-btn(@click='mutate({universal: true})') Logout of all devices
</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import { useLogoutMutation, useBakeMacaroonMutation } from '~/types/ApiTypes'
import { authStore } from '~/store'
import useClipboard from '~/composition/useClipboard'

export default defineComponent({
  setup () {
    const { mutate: logout, onDone: onLogout } = useLogoutMutation()
    const { mutate: bake, onDone: onBake, loading: baking } = useBakeMacaroonMutation()
    const { copy, isCopied } = useClipboard()

    onLogout((res) => {
      console.log({res})
      if (res && res.data) {
        authStore.LOGOUT(res.data)
        location.reload()
      }
    })

    const macaroon = ref('')
    const shareLink = ref('')

    onBake((res) => {
      if (res && res.data && res.data.bakeMacaroon.__typename == 'AttenuatedMacaroon') {
        macaroon.value = res.data.bakeMacaroon.macaroon
        shareLink.value = `${window.location.href}addinvoice/${macaroon.value}`
        copy(shareLink.value)
      }
    })

    return {
      logout,
      bake,
      macaroon,
      shareLink,
      baking
    }
  }
})
</script>