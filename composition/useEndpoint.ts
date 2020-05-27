export default function useEndpoint () {
    function getEndpoint (): string {
        return window.localStorage.getItem('endpoint') || process.env.endpoint || ''
    }

    function setEndpoint(endpoint: string) {
        window.localStorage.setItem('endpoint', endpoint)
    }

    // reload the instance to the desired page to force apollo re-initialization
    function reloadInstance(to?: string)  {
        const origin = window.location.origin
        if (to) {
            window.location.assign(`${origin}${to}`)
        } else {
            window.location.reload()
        }
    }

    return {
        getEndpoint,
        setEndpoint,
        reloadInstance
    }
}