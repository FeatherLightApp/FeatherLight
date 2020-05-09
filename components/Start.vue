<template lang="pug">
  v-container
    v-row(justify="space-around")
      v-col(cols="12")
        v-row(justify="center")
          v-btn(@click="mutateCreate('USER')" :loading="loading" x-large block ripple).my-3 New Wallet
      v-col(cols="12" v-if="errorMsg")
        v-row(justify="center").tertiary--text
          | {{ errorMsg }}
      v-col(cols="12")
        v-row(justify="center")
          v-btn(to="/recover" x-large block ripple).my-3 Recover Wallet
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useCreateUserMutation } from '~/types/ApiTypes'
import { authStore } from '~/store'

export default defineComponent({
  setup (_, { root }) {
    const { mutate: mutateCreate, loading, onDone } = useCreateUserMutation()
    const errorMsg = ref('')

    onDone((res) => {
      console.log({ res })
      if (res && res.data) {
        authStore.CREATE_USER(res.data)
        if (res.data.createUser.__typename === 'NewUser') {
          root.$router.push('/credentials')
        } else {
          errorMsg.value = res.data.createUser.message
        }
      }
    })


    return {
      loading,
      mutateCreate,
      errorMsg
    }
  }
})
</script>