<template lang="pug">
  v-container
    v-form(
      lazy-validation
      v-model='valid'
      @submit.prevent='mutate(amt * settingsStore.multiplier, memo)'
    )
      v-row(justify='center')
        v-col(cols='12')
          v-text-field(
            v-model='amt'
            outlined
            label='Amount'
            placeholder='Amount'
            reverse
            :rules="[validAmt, required]"
            :loading='loading'
            required
          )
            template(v-slot:prepend-inner)
              v-select(
                :items='currencies'
                v-model='currency'
                style='width: 4.2em;'
                dense
                loader-height="0" 
              ).ml-3
        v-col(cols='12').text-right
          v-btn(:disabled='!valid || loading' type='submit') Create Invoice
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
    const { required, validAmt, valid } = useValidation()
    const currencies = ref(['sats', 'CAD'])
    const loading = computed(() => settingsStore.loading)

    const currency = computed({
      get: () => settingsStore.currency,
      set: (val) => settingsStore.changeCurrency(val)
    })

    const { mutate, onDone } = useAddInvoiceMutation()

    onDone((res) => {

    })

    return {
      settingsStore,
      amt,
      required,
      validAmt,
      valid,
      mutate,
      currencies,
      currency,
      loading
    }
  }
})
</script>