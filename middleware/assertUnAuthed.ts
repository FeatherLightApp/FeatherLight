import { authStore } from '~/store'
import { Middleware, Context } from '@nuxt/types'

const assertUnAuthed: Middleware = ({ redirect }: Context) => {
    if (authStore.isAuthenticated) {
        return redirect('/')
    }
}

export default assertUnAuthed