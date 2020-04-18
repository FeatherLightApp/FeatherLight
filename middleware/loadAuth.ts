import { authStore } from '~/store'
import { Middleware, Context } from '@nuxt/types'
import { RefreshMacaroonsMutation } from '~/types/ApiTypes'
import gql from 'graphql-tag'

//  TODO determine if composition api can be used in middleware
// for now resort to axios
const loadAuth: Middleware = async ({ $axios }: Context) => {
    if (!authStore.isAuthenticated) {
        const res = await $axios.post(process.env.endpoint || '', {
            query: `
                mutation refreshMacaroons {
                    refreshMacaroons {
                        __typename
                        ... on TokenPayload {
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
}

export default loadAuth