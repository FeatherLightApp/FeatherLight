import { authStore } from '~/store'
import { Middleware, Context } from '@nuxt/types'
import { useRefreshMacaroonsMutation } from '~/types/ApiTypes'

const loadAuth: Middleware = async ({ redirect }: Context) => {
    if (!authStore.isAuthenticated) {
        console.log('got here')
        const { mutate } = useRefreshMacaroonsMutation()
        const res = await mutate({},{})
        console.log({res})
        authStore.REFRESH_MACAROONS(res.data)
    }
}

export default loadAuth