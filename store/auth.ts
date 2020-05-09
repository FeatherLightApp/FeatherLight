import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { CreateUserMutation, RefreshMacaroonsMutation, LoginMutation, LogoutMutation } from '~/types/ApiTypes'

@Module({
    name: 'auth',
    stateFactory: true,
    namespaced: true
})
export default class AuthModule extends VuexModule {
    access = ''
    username = ''
    password = ''

    @Mutation
    CREATE_USER ({ createUser }: CreateUserMutation) {
        if (createUser.__typename === 'NewUser') {
            this.access = createUser.tokens.access
            this.username = createUser.username
            this.password = createUser.password
        }
    }

    @Mutation
    LOGIN ({ login }: LoginMutation) {
        if (login.__typename === 'AuthPayload') {
            this.access = login.access
        }
    }

    @Mutation
    LOGOUT({ logout }: LogoutMutation) {
        console.log({logout})
        if (!logout) {
            console.log('nullifying')
            this.access = ''
            this.username = ''
            this.password = ''
        }
    }

    @Mutation
    REFRESH_MACAROONS ({ refreshMacaroons }: RefreshMacaroonsMutation ) {
        if (refreshMacaroons.__typename === 'AuthPayload') {
            this.access = refreshMacaroons.access
        }
    }

    get isAuthenticated () {
        return !!this.access
    }

}