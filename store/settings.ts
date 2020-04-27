import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
import { Currency } from '~/types/currency'

interface CurrencyPayload {
    currency: Currency,
    rate: number
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
    rate = 1
    loading = false

    @Mutation
    SET_CURRENCY({ currency, rate}: CurrencyPayload) {
        this.currency = currency
        this.rate = rate
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
                rate: 1
            })
        } else {
            this.context.commit('IS_LOADING')
            const res = await axios.get(`https://blockchain.info/tobtc?currency=${currency}&value=1&cors=true`)
            console.log({res})
            this.context.commit('SET_CURRENCY', {
                currency,
                rate: +res.data
            })
        }
        window.localStorage.setItem('currency', currency)
    }
}