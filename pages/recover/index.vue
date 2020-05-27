<template lang="pug">
  v-form(lazy-validation @submit.prevent="mutateLogin({username, password})" v-model="isValid")
    v-container
      v-row(justify='center' align='center')
        v-container(fluid)
        v-col(cols="11" md='10' lg='8')
          v-text-field(v-model="field" :rules="[validate]" outlined label="Recovery Key" :error-messages="errorMsg")
        v-col(cols="11" md='10' lg='8').text-center
            v-btn(type="submit" x-large block :disabled="!isValid")
              | Recover Wallet

</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from '@vue/composition-api'
import { useLoginMutation } from '~/types/ApiTypes'
import { authStore } from '~/store'

export default defineComponent({
  layout: 'plain',
  middleware: ['loadAuth', 'assertUnAuthed'],
  setup (_, {root}) {
    const username = computed(() => field.value.split(':')[0])
    const password = computed(() => field.value.split(':')[1])

    const { mutate: mutateLogin, loading, onDone } = useLoginMutation()


    const errorMsg = ref('')
    onDone((res) => {
      if (res && res.data && res.data.login.__typename == 'Error') {
        errorMsg.value = res.data.login.message
      } else if (res && res.data) {
        authStore.LOGIN(res.data)
        root.$router.push('/')
      }
    })


    function validate (val: string) {
      return val.length == 41 && username.value.length == 20 && !!password.value.length || 'Invalid recovery key'
    }


    const isValid = ref(false)
    const field = ref('')

    watch(field, () => errorMsg.value = '')

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