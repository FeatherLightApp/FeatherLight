<template lang="pug">
  v-container
    v-row(justify="space-around")
      v-col(cols="12")
        v-row(justify="center")
          v-btn(@click="mutateCreate('USER')" :loading="loading" x-large block ripple).my-3 Create New Wallet
      v-col(cols="12")
        v-row(justify="center")
          v-btn(to="/recover" x-large block ripple).my-3 Recover Wallet
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreateUserMutation } from '~/types/ApiTypes'
import { authStore } from '~/store'

export default defineComponent({
  layout: 'plain',
  setup (_, { root }) {
    const { mutate: mutateCreate, loading, onDone } = useCreateUserMutation()

    onDone((res) => {
      if (res && res.data) {
        authStore.CREATE_USER(res.data)
        root.$router.push('/')
      }
    })

    return {
      loading,
      mutateCreate
    }
  }
})
</script>