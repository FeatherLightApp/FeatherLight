<template>
  <v-fade-transition mode="out-in">
    <v-container v-if="!showRecover">
      <v-row justify="center">
        <v-col>
          <v-row justify="center">
            <v-btn @click="create" :loading="createLoading">New Wallet</v-btn>
          </v-row>
        </v-col>
        <v-col>
          <v-row justify="center">
            <v-btn @click="showRecover = true">Recover Wallet</v-btn>
          </v-row>
        </v-col>
        <v-col cols="12" v-if="newRecoveryKey.length > 1">
          {{ newRecoveryKey }}
        </v-col>
      </v-row>
    </v-container>
    <v-form
      v-else
      v-model="valid"
      lazy-validation
      @submit.prevent="recover({username, password})"
    >
      <v-container>
        <v-row justify="center">
          <v-col>
              <v-text-field
                v-model="recoveryKey"
                :rules="rules"
                required
              ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              type="submit"
              :disabled="!valid"
              :loading="recoverLoading"
            >Recover Wallet</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-fade-transition>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import useCreateUser from '~/composition/useCreateUser'
import useLogin from '~/composition/useLogin'
import { authStore } from '~/store'

// un unauthed route config in middleware
export default defineComponent({
  setup () {
    const { create, loading: createLoading } = useCreateUser()
    const { login: recover, loading: recoverLoading } = useLogin()
    const newRecoveryKey = computed(() => `${authStore.username}:${authStore.password}`)

    const rules = [
      (val: string) => {
        const rightLen = val.length === 41
        const split = val.split(':')
        const valid = rightLen && split.length == 2 && split[0].length == split[1].length
        return valid || 'Invalid Recovery Key'
      }
    ]

    const valid = ref(false)
    const showRecover = ref(false)
    const recoveryKey = ref('')
    const username = computed(() => recoveryKey.value.split(':')[0] || '')
    const password = computed(() => recoveryKey.value.split(':')[1] || '')


    return {
      create,
      createLoading,
      recover,
      recoverLoading,
      rules,
      newRecoveryKey,
      valid,
      showRecover,
      recoveryKey,
      username,
      password
    }
  }
})
</script>