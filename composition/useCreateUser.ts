import { reactive, computed, ref } from "@vue/composition-api";
import { authStore } from '~/store'
import { useCreateUserMutation, Role} from '~/types/compositions'


// Provide the mutations to the auth store
export default function useCreateUSer () {
    const { mutate: create, loading, onDone, onError } = useCreateUserMutation({ variables: { role: Role.User }})

    onDone((data) => {
        if (data?.data?.createUser.__typename == 'Error') {
            authStore.SET_ERROR(data.data.createUser.message || '')
        } else if (data?.data?.createUser.__typename == 'User') {
            const payload = data.data.createUser

            authStore.SET_NEW_USER({
                username: payload.username || '',
                password: payload.password || '',
                access: payload.tokens.access
            })
        }
    })

    onError((data) => {
        authStore.SET_ERROR(data?.message || '')
    })

    return {
        create,
        loading
    }
}