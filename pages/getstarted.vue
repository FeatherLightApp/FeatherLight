<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-row justify="center">
          <v-btn @click="create" :loading="loading">New Wallet</v-btn>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <v-btn>Recover Wallet</v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" v-if="state.username">
        {{ combined }}
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api'
import { useCreateUserMutation, Role } from '~/types/types'

export default defineComponent({
  setup () {
    const { mutate: create, loading, onDone } = useCreateUserMutation({ variables: { role: Role.User }})
    const state = reactive({
      username: '',
      password: '',
      access: '',
      refresh: ''
    })

    onDone((data) => {
      console.log({ data })
      if (data?.data?.createUser?.__typename == 'User') {
        const user = data.data.createUser
        state.username = user.username || ''
        state.password = user.password || ''
        document.cookie = `refresh=${user.tokens?.refresh}`
        state.refresh = user.tokens?.refresh
        state.access = user.tokens?.access
      }
    })

    const combined = computed(() => {
      `Your username is ${state.username}. Your password is ${state.password}.`
    })

    return {
      combined,
      loading,
      state,
      create
    }
  }
})
</script>