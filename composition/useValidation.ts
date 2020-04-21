import { ref } from '@vue/composition-api'

export default function useValidation () {
    // is form valid
    const valid = ref(true)

    // generic validation
    const required = (v: string) => !!v || 'Value is required'
    const validAmt = (v: string) => /[0-9]+(\.[0-9][0-9])?$/.test(v) && !isNaN(+v) && +v > 0 || 'Invalid Amount'

    return {
        required,
        valid,
        validAmt
    }
}