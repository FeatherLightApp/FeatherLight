import { ref } from '@vue/composition-api'
import { walletStore } from '~/store'
import { settingsStore } from '~/store'
import useCurrenyRounding from '~/composition/useCurrencyRounding'

export default function useValidation () {
    // is form valid
    const valid = ref(true)
    const { value: computedAmt } = useCurrenyRounding()

    // generic validation
    const required = (v: string) => !!v || 'Value is required'
    const validAmt = (v: string) => /[0-9]+(\.[0-9][0-9])?$/.test(v) && !isNaN(+v) && +v > 0 || 'Invalid Amount'
    const sufficientAmount = (v: string) => +v < computedAmt.value || 'Insufficient Balance'
    const char1024 = (v: string) => v.length <= 1024 || 'Too Long'
    const isURL = (v: string) => /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(v) || 'Invalid URL'
    

    return {
        required,
        valid,
        validAmt,
        sufficientAmount,
        char1024,
        isURL
    }
}