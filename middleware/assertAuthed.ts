import { authStore } from '~/store'
import { Middleware, Context } from '@nuxt/types'

const assertAuthed: Middleware = async ({ redirect }: Context) => {
    if (!authStore.isAuthenticated) {
        console.log('redirect /')
        return redirect('/')
    }
}

export default assertAuthed