import { authStore } from '~/store'
import { Middleware, Context } from '@nuxt/types'

const assertUnAuthed: Middleware = ({ redirect }: Context) => {
    if (authStore.isAuthenticated) {
        console.log('redirect /')
        return redirect('/')
    }
}

export default assertUnAuthed