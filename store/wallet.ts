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
    network = ''
    version = ''
    feed: Array<UserInvoice | PaidInvoice | Deposit> = []
    loading = false
    paymentReq = ''

    @Mutation
    ME({ me, network, version }: MeQuery) {
        if (me.__typename == 'User') {
            this.balance = me.balance
            this.created = me.created
            this.btcAddress = me.btcAddress
            this.feed = me.feed.filter(notEmpty)
        }
        this.network = network
        this.version = version
    }


    @Mutation
    ADD_INVOICE({ addInvoice }: AddInvoiceMutation) {
        if (addInvoice.__typename == 'UserInvoice') {
            this.feed = [addInvoice, ...this.feed]
        }
    }

    @Mutation
    ADD_PAID_INVOICE({ payInvoice }: SendPaymentMutation) {
        if (payInvoice.__typename == 'PaidInvoice') {
            this.feed = [payInvoice, ...this.feed]
        }
    }

    @Mutation
    FEED ({ me }: FeedQuery) {
        if (me.__typename == 'User' && me.feed) {
            this.feed = me.feed.filter(notEmpty)
            this.balance = me.balance
        }
    }

    @Mutation
    PAYMENT_REQ(v: string) {
        this.paymentReq = v
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