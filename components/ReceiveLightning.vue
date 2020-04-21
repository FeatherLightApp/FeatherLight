<template lang="pug">
  v-form(
    v-model='valid'
    @submit.prevent='mutate(amt * settingsStore.multiplier, memo)'
  )
    v-row(justify='center')
      v-col(cols='12')
        v-text-field(
          v-model='amt'
          outlined
          filled
          label='Amount'
          placeholder='0'
          reverse
          :rules="[validAmt, required]"
          :prefix="settingsStore.currency"
          required
        )
      v-col(cols='12')
        v-text-field(
          v-model='memo'
          outlined
          filled
          counter='1024'
          label='Memo'
          placeholder='Transaction description'
          :rules='[required, char1024]'
          required
        )
      v-col(cols='12').text-right
        v-btn(
          :disabled='!valid || settingsStore.loading'
          type='submit'
          :loading='submitting'
        ) Create Invoice
</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import useValidation from '~/composition/useValidation'
import { useAddInvoiceMutation } from '~/types/ApiTypes'
import { settingsStore } from '~/store'

export default defineComponent({
  setup () {
    const amt = ref('')
    const memo = ref('')
    const { required, validAmt, valid, char1024 } = useValidation()



    const currency = computed({
      get: () => settingsStore.currency,
      set: (val) => settingsStore.changeCurrency(val)
    })

    const { mutate, onDone, loading: submitting } = useAddInvoiceMutation()

    onDone((res) => {

    })

    return {
      amt,
      memo,
      required,
      validAmt,
      valid,
      char1024,
      settingsStore,
      submitting
    }

  }
})
</script>