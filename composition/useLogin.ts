import { authStore } from '~/store'
import { useLoginMutation } from '~/types/ApiTypes'

export default function useLogin () {
    const { mutate: login, loading, onDone, onError} = useLoginMutation()

    onDone((data) => {
        if (data?.data?.login.__typename == 'TokenPayload') {
            authStore.SET_ACCESS(data.data.login.access)
        } else if (data?.data?.login.__typename == 'Error') {
            authStore.SET_ERROR(data.data.login.message || '')
        }
    })

    onError((data) => {
        authStore.SET_ERROR(data?.message || '')
    })

    return {
        login,
        loading
    }
}