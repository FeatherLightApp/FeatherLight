import { walletStore, settingsStore } from '~/store'
import { computed } from '@vue/composition-api'
import { Currency } from '~/types/currency'

const useCurrencyRounding = () => {

    function translate(val: number) {
        if (settingsStore.currency == 'sats') {
            return +val
        }
        const unrounded = val / (settingsStore.rate * 100000000) //btc to sat to true val
        if (settingsStore.currency == Currency.JPY) {
            return Math.round(unrounded + Number.EPSILON)
        } else {
            return Math.round((unrounded + Number.EPSILON) * 100) / 100 
        }
    }

    const multiplier = computed(() => {
        if (settingsStore.currency == 'sats') {
            return 1
        }
        return 1 / (settingsStore.rate * 100000000)
    })

    function round (val: number) {
        if (settingsStore.currency == Currency.JPY) {
            return Math.round(val + Number.EPSILON)
        } else {
            return Math.round((val + Number.EPSILON) * 100 ) / 100
        }
    }

    const value = computed(() => translate(walletStore.balance))

    return {
        translate,
        value,
        multiplier,
        round
    }
}

export default useCurrencyRounding