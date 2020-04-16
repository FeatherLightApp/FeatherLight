import { useRefreshMacaroonsMutation } from '~/types/ApiTypes'
import { authStore } from '~/store'

export default function useGetAccess () {
    const { mutate: refreshMacaroon, loading, onDone, onError } = useRefreshMacaroonsMutation()

    onDone((data) => {
        if (data?.data?.refreshMacaroons.__typename == 'Error') {
            authStore.SET_ERROR(data.data.refreshMacaroons.message || '')
        } else if (data?.data?.refreshMacaroons.__typename == 'TokenPayload') {
            const payload = data.data.refreshMacaroons
            authStore.SET_ACCESS(payload.access)
        }
    })

    onError((data) => {
        authStore.SET_ERROR(data?.message || '')
    })

    return {
        refreshMacaroon,
        loading
    }
}