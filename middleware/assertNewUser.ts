import { authStore } from '~/store'
import { Middleware, Context } from '@nuxt/types'

const assertNewUser: Middleware = ({ redirect }: Context) => {
    if (!authStore.username || !authStore.password) {
        return redirect('/')
    }
}

export default assertNewUser