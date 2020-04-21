import { authStore, walletStore } from '~/store'
import { computed } from '@vue/composition-api'

const useErrorHandler = () => {
    const errorType = computed(() => authStore.errorType || walletStore.errorType)
    const errorMessage = computed(() => authStore.errorMessage || walletStore.errorMessage)

    function clear () {
        authStore.CLEAR_ERROR()
        walletStore.CLEAR_ERROR()
    }

    return {
        errorType,
        errorMessage,
        clear
    }
}

export default useErrorHandler