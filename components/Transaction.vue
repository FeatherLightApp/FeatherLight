<template lang="pug">
  v-container
    v-row
      v-col
        | {{ walletStore.userInvoice }}
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { walletStore } from '~/store'
import { useGetTransactionsQuery } from '~/types/ApiTypes'

export default defineComponent({
  setup () {
    const { loading, onResult } = useGetTransactionsQuery()

    onResult((res) => {
      if (res && res.data) {
        walletStore.GET_TX(res.data)
      }
    })

    return {
      walletStore
    }
  }
})
</script>