export default function useVibrate () {
    function vibrate (n: number) {
        window.navigator.vibrate(200)
    }

    return {
        vibrate
    }
}