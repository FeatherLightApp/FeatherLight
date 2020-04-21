import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { MeQuery } from '~/types/ApiTypes'

@Module({
    name: 'wallet',
    stateFactory: true,
    namespaced: true
})
export default class WalletModule extends VuexModule {
    balance = 0
    created = 0
    btcAddress = ''
    errorType = ''
    errorMessage = ''

    @Mutation
    ME({ me }: MeQuery) {
        if (me.__typename == 'User') {
            this.balance = me.balance
            this.created = me.created
            this.btcAddress = me.btcAddress
        } else {
            this.errorType = me.errorType
            this.errorMessage = me.message
        }
    }

    @Mutation
    CLEAR_ERROR () {
        this.errorMessage = ''
        this.errorType = ''
    }
}