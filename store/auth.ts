import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Role, useCreateUserMutation, CreateUserMutation, RefreshMacaroonsMutation, Error, LoginMutation, TokenPayload } from '~/types/ApiTypes'
import { set } from 'js-cookie'

const writeRefresh = (refresh: string) => {
    set('refresh', refresh, {
        expires: 7,
        domain: 'seanaye.ca'
    })
}

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
    _ERROR ({ message, errorType }: Error) {
        this.errorType = errorType
        this.errorMessage = message
    }

    @Mutation
    CREATE_USER ({ createUser }: CreateUserMutation) {
        if (createUser.__typename === 'NewUser') {
            this.access = createUser.tokens.access
            this.username = createUser.username
            this.access = createUser.password
            writeRefresh(createUser.tokens.refresh)
        } else {
            this.context.commit('_ERROR', createUser)
        }
    }

    @Mutation
    LOGIN ({ login }: LoginMutation) {
        if (login.__typename === 'TokenPayload') {
            this.access = login.access
            writeRefresh(login.refresh)
        } else {
            this.context.commit('_ERROR', login)
        }
    }

    @Mutation
    REFRESH_MACAROONS ({ refreshMacaroons }: RefreshMacaroonsMutation ) {
        if (refreshMacaroons.__typename === 'TokenPayload') {
            this.access = refreshMacaroons.access
            writeRefresh(refreshMacaroons.refresh)
        } else {
            this.context.commit('_ERROR', refreshMacaroons)
        }
    }

    get isAuthenticated () {
        return !!this.access
    }
}