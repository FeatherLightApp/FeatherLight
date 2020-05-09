import { authStore, settingsStore } from '~/store'
import { Middleware, Context } from '@nuxt/types'
import { RefreshMacaroonsMutation } from '~/types/ApiTypes'
import gql from 'graphql-tag'
import { Currency } from '~/types/currency'

//  TODO determine if composition api can be used in middleware
// for now resort to axios
const loadAuth: Middleware = async ({ $axios }: Context) => {
    if (!authStore.isAuthenticated) {
        const res = await $axios.post(process.env.endpoint || '', {
            query: `
                mutation refreshMacaroons {
                    refreshMacaroons {
                        __typename
                        ... on AuthPayload {
                            access
                            refresh
                        }
                        ... on Error {
                            message
                            errorType
                        }
                    }
                }
            `
        }, {
            withCredentials: true
        })
        console.log({ res })
        if (res.data) {
            authStore.REFRESH_MACAROONS(res.data.data)
        }
    }
    if (authStore.isAuthenticated) {
        const cur = window.localStorage.getItem('currency')
        if (cur) {
            await settingsStore.changeCurrency(cur)
        }
    }
}

export default loadAuth