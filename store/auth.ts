import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

interface newUserPayload {
    access: string
    username: string
    password: string
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
    error = ''


    @Mutation
    SET_NEW_USER ({ access, username, password }: newUserPayload) {
        this.access = access
        this.username = username
        this.password = password
    }

    @Mutation
    SET_ACCESS (access: string) {
        this.access = access
    }

    @Mutation
    SET_ERROR (error: string) {
        this.error = error
    }

    get isAuthenticated () {
        return !!this.access
    }
}