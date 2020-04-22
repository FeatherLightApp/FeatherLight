import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { MeQuery, UserInvoice, PaidInvoice, Deposit, AddInvoiceMutation, GetTransactionsQuery } from '~/types/ApiTypes'


function notEmpty<T>(v: T | null | undefined): v is T {
    return v !== null && v !== undefined;
}

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
    userInvoice: UserInvoice[] = []
    paidInvoice: PaidInvoice[] = []
    deposit: Deposit[] = []

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
    ADD_INVOICE({ addInvoice }: AddInvoiceMutation) {
        if (addInvoice.__typename == 'UserInvoice') {
            this.userInvoice = [...this.userInvoice, addInvoice]
        } else {
            this.errorType = addInvoice.errorType
            this.errorMessage = addInvoice.message
        }
    }

    @Mutation
    GET_TX ({ me }: GetTransactionsQuery) {
        if (me.__typename == 'User' && me.invoices) {
            const toAdd = me.invoices.filter(notEmpty)
            this.userInvoice = [...this.userInvoice, ...toAdd]
        }
    }

    @Mutation
    CLEAR_ERROR () {
        this.errorMessage = ''
        this.errorType = ''
    }
}