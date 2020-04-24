<template lang="pug">
  v-container
    v-row
      v-col
        | {{ walletStore.feed }}
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { walletStore } from '~/store'
import { useFeedQuery } from '~/types/ApiTypes'

export default defineComponent({
  setup () {
    const { loading, onResult } = useFeedQuery()

    onResult((res) => {
      if (res && res.data) {
        walletStore.FEED(res.data)
      }
    })

    return {
      walletStore
    }
  }
})
</script>