import { authStore } from '~/store'
import { Middleware, Context } from '@nuxt/types'

const assertAuthed: Middleware = async ({ redirect }: Context) => {
    if (!authStore.isAuthenticated) {
        return redirect('/start')
    }
}

export default assertAuthed