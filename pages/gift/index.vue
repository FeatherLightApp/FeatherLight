<template lang="pug">
  v-card
    v-card-title Gift a Preloaded Wallet (Coming Soon)
    v-card-text
      | Have friends who should start &nbsp;
      a(href='https://twitter.com/search?q=%23stackingsats' target="_blank" ) #StackingSats
      | ? Pre-pay for a wallet so they can transact on the lightning network right away!
      br
      br
      | You purchase a ticket which can load sats on a new wallet, but the wallet is not generated until they use the ticket. 
      | This ensures the recovery key is only held by the rightful owner of the wallet.
    v-card-actions
      v-form(
        v-if='!payReq'
        ref='form'
        v-model='valid'
        lazy-validation
        @submit.prevent='form.validate() ? mutate({amt: translate(amt), memo}) : null'
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
              :rules="[validAmt, required, enoughSats]"
              :prefix="settingsStore.currency"
            )
          v-col(cols='12')
            v-text-field(
              v-model='memo'
              outlined
              filled
              counter='1024'
              label='Memo'
              :rules='[required, char1024]'
            )
          v-col(cols='12').text-right
            v-tooltip(top :disabled='!disabledInternal')
              template(v-slot:activator='{ on }')
                v-btn(
                  :disabled='disabledInternal'
                  v-on='on'
                  type='submit'
                  :loading='submitting'
                ) Pay with FeatherLight
              | {{ disabledAny ? "Make sure fields are correct" : "You are not logged into FeatherLight"}}
              
</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import useValidation from '~/composition/useValidation'
import useCurrencyRounding from '~/composition/useCurrencyRounding'
import { settingsStore, authStore } from '~/store'

export default defineComponent({
  middleware: 'loadAuth',
  setup () {
    const { valid, validAmt, required, char1024 } = useValidation()
    const { inSats } = useCurrencyRounding()

    const amt = ref('')
    const memo = ref('')

    function enoughSats (v: string) {
      return inSats(+v) >= 10000
    }

    const disabledAny = computed(() => !valid || settingsStore.loading)
    const disabledInternal = computed(() => disabledAny.value || !authStore.isAuthenticated)

    const form = ref<HTMLFormElement|null>(null)
    return {
      form,
      valid,
      amt,
      validAmt,
      required,
      enoughSats,
      char1024,
      memo,
      settingsStore,
      authStore,
      disabledAny,
      disabledInternal
    }
  }
})
</script>