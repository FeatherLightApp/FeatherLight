<template lang="pug">
  v-expand-transition
    v-form(
      v-if='!payReq'
      v-model='valid'
      @submit.prevent='mutate({amt: translate(amt), memo})'
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
    display-code(v-else :code='payReq')
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import useValidation from '~/composition/useValidation'
import { useAddInvoiceMutation } from '~/types/ApiTypes'
import { settingsStore, walletStore } from '~/store'
import useCurrencyRounding from '~/composition/useCurrencyRounding'

export default defineComponent({
  name: 'receive-lightning',
  components: {
    DisplayCode: () => import('~/components/DisplayCode.vue')
  },
  setup () {
    const amt = ref('')
    const memo = ref('')
    const { required, validAmt, valid, char1024 } = useValidation()
    const { translate } = useCurrencyRounding()

    const currency = computed({
      get: () => settingsStore.currency,
      set: (val) => settingsStore.changeCurrency(val)
    })

    const { mutate, onDone, loading: submitting } = useAddInvoiceMutation()

    const payReq = ref('')
    onDone((res) => {
      if (res && res.data) {
        walletStore.ADD_INVOICE(res.data)
        if (res.data.addInvoice.__typename == 'UserInvoice') {
          payReq.value = res.data.addInvoice.paymentRequest
        }
      }
    })


    const hasBeenPaid = computed(() => {
      const thisPayment = walletStore.userInvoices.filter((elem) => elem.paymentRequest == payReq.value)[0]
      return !!thisPayment && thisPayment.paid
    })

    watch(hasBeenPaid, () => {
      if (hasBeenPaid.value) {
        settingsStore.TAB(1)
        payReq.value = ''
      }
    })

    return {
      amt,
      memo,
      required,
      validAmt,
      valid,
      char1024,
      settingsStore,
      submitting,
      mutate,
      translate,
      payReq
    }

  }
})
</script>