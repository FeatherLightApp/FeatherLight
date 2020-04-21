import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Role, useCreateUserMutation, CreateUserMutation, RefreshMacaroonsMutation, Error, LoginMutation, TokenPayload } from '~/types/ApiTypes'

@Module({
    name: 'auth',
    stateFactory: true,
    namespaced: true
})
export default class AuthModule extends VuexModule {
    access = ''
    username = ''
    password = ''
    errorType = ''
    errorMessage = ''

    @Mutation
    CREATE_USER ({ createUser }: CreateUserMutation) {
        if (createUser.__typename === 'NewUser') {
            this.access = createUser.tokens.access
            this.username = createUser.username
            this.password = createUser.password
        } else {
            this.errorType = createUser.errorType
            this.errorMessage = createUser.message
        }
    }

    @Mutation
    LOGIN ({ login }: LoginMutation) {
        if (login.__typename === 'TokenPayload') {
            this.access = login.access
        } else {
            this.errorType = login.errorType
            this.errorMessage = login.message
        }
    }

    @Mutation
    REFRESH_MACAROONS ({ refreshMacaroons }: RefreshMacaroonsMutation ) {
        if (refreshMacaroons.__typename === 'TokenPayload') {
            this.access = refreshMacaroons.access
        } else {
            this.errorType = refreshMacaroons.errorType
            this.errorMessage = refreshMacaroons.message
        }
    }

    get isAuthenticated () {
        return !!this.access
    }

    @Mutation
    CLEAR_ERROR () {
        this.errorMessage = ''
        this.errorType = ''
    }
}