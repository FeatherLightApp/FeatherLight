<template lang="pug">
  v-container
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
            placeholder='Amount'
            reverse
            :rules="[validAmt, required, sufficientAmount]"
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
            :rules='[required, char1024]'
            required
          )
        v-col(cols='12').text-right
          v-btn(:disabled='!valid || loading' type='submit' :loading='submitting') Create Invoice
</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import  useValidation from '~/composition/useValidation'
import { settingsStore } from '~/store'
import { useAddInvoiceMutation } from '~/types/ApiTypes'

export default defineComponent({
  setup () {
    const amt = ref(0)
    const memo = ref('')
    const { required, validAmt, valid, sufficientAmount, char1024 } = useValidation()
    const loading = computed(() => settingsStore.loading)

    const currency = computed({
      get: () => settingsStore.currency,
      set: (val) => settingsStore.changeCurrency(val)
    })

    const { mutate, onDone, loading: submitting } = useAddInvoiceMutation()

    onDone((res) => {

    })

    return {
      settingsStore,
      amt,
      required,
      validAmt,
      sufficientAmount,
      char1024,
      valid,
      mutate,
      currency,
      loading,
      submitting,
      memo
    }
  }
})
</script>