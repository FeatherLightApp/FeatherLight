import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { MeQuery, UserInvoice, PaidInvoice, Deposit, AddInvoiceMutation, FeedQuery, SendPaymentMutation } from '~/types/ApiTypes'


function notEmpty<T>(v: T | null | undefined): v is T {
    return v !== null && v !== undefined;
}

function isDeposit(v: Deposit | UserInvoice | PaidInvoice): v is Deposit {
    return !!v.__typename && v.__typename == 'Deposit'
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
    feed: Array<UserInvoice | PaidInvoice | Deposit> = []
    loading = false

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
            this.feed = [addInvoice, ...this.feed]
        } else {
            this.errorType = addInvoice.errorType
            this.errorMessage = addInvoice.message
        }
    }

    @Mutation
    ADD_PAID_INVOICE({ payInvoice }: SendPaymentMutation) {
        if (payInvoice.__typename == 'PaidInvoice') {
            this.feed = [payInvoice, ...this.feed]
        } else {
            this.errorType = payInvoice.errorType
            this.errorMessage = payInvoice.message
        }
    }

    @Mutation
    FEED ({ me }: FeedQuery) {
        console.log({me})
        if (me.__typename == 'User' && me.feed) {
            this.feed = me.feed.filter(notEmpty)
            this.balance = me.balance
        }
    }

    @Mutation
    CLEAR_ERROR () {
        this.errorMessage = ''
        this.errorType = ''
    }

    @Mutation
    LOADING (v: boolean) {
        this.loading = v
    }

    get userInvoices (): UserInvoice[] {
        return this.feed.filter((i): i is UserInvoice => i.__typename == 'UserInvoice')
    }

    get paidInvoices (): PaidInvoice[] {
        return this.feed.filter((i): i is PaidInvoice => i.__typename == 'PaidInvoice')
    }

    get deposits (): Deposit[] {
        return this.feed.filter((i): i is Deposit => i.__typename == 'Deposit')
    }
}