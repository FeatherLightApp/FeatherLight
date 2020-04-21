<template lang="pug">
  v-form(lazy-validation @submit.prevent="mutateLogin({username, password})" v-model="isValid")
    v-container
      v-row
        v-col(cols="12")
          v-text-field(v-model="field" :rules="[validate]" outlined placeholder="Recovery Key" :error-messages="errorMsg")
      v-row
        v-col(cols="12")
          v-row(justify="center")
            v-btn(type="submit" x-large block :disabled="!isValid")
              | Recover Wallet

</template>
<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import { useLoginMutation } from '~/types/ApiTypes'
import { authStore } from '~/store'

export default defineComponent({
  layout: 'plain',
  setup (_, {root}) {
    const { mutate: mutateLogin, loading, onDone } = useLoginMutation()

    onDone((res) => {
      if (res && res.data) {
        authStore.LOGIN(res.data)
        root.$router.push('/')
      }
    })

    const field = ref('')

    const username = computed(() => field.value.split(':')[0])
    const password = computed(() => field.value.split(':')[1])

    function validate (val: string) {
      return val.length == 41 && username.value.length == 20 && !!password.value.length || 'Invalid recovery key'
    }

    const isValid = ref(false)

    const errorMsg = computed(() => authStore.errorMessage)

    return {
      field,
      username,
      password,
      loading,
      mutateLogin,
      validate,
      isValid,
      errorMsg
    }
  }
})
</script>