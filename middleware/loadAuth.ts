import { authStore, settingsStore } from '~/store'
import { Middleware, Context } from '@nuxt/types'
import useEndpoint from '~/composition/useEndpoint'

const { getEndpoint } = useEndpoint()

const loadAuth: Middleware = async ({ $axios }: Context) => {
    if (!authStore.isAuthenticated) {
        const res = await $axios.post(getEndpoint(), {
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