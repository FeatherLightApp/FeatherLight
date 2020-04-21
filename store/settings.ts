import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
import { Currency } from '~/types/currency'

interface CurrencyPayload {
    currency: Currency,
    multiplier: number
}

@Module({
    name: 'settings',
    stateFactory: true,
    namespaced: true
})
export default class SetttingsModule extends VuexModule {
    init = false
    currency = Currency.sats
    currencies = Object.keys(Currency)
    multiplier = 1
    loading = false

    @Mutation
    SET_CURRENCY({ currency, multiplier}: CurrencyPayload) {
        this.currency = currency
        this.multiplier = multiplier
        this.loading = false
    }

    @Mutation
    IS_LOADING () {
        this.loading = true
    }

    @Mutation
    INIT() {
        this.init = true
    }


    @Action
    async changeCurrency(currency: Currency | string) { // string is used when setting value from localstorage
        if (currency == Currency.sats) {
            this.context.commit('SET_CURRENCY', {
                currency: Currency.sats,
                multiplier: 1
            })
        } else {
            this.context.commit('IS_LOADING')
            const res = await axios.get(`https://blockchain.info/tobtc?currency=${currency}&value=1&cors=true`)
            this.context.commit('SET_CURRENCY', {
                currency,
                multiplier: +res.data * 100000000 //change btc to sats
            })
        }
        window.localStorage.setItem('currency', currency)
    }
}