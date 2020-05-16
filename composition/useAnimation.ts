export default function useAnimation (delay: number, startDelay: number) {
    function beforeEnter (el: HTMLElement) {
        el.style.opacity = '0'
        // @ts-ignore
        el.style['-webkit-transform'] = 'translateY(75%)'
        // @ts-ignore
        el.style['-moz-transform'] = 'translateY(75%)'
        el.style.transform = 'translateY(75%)'
    }
    function enter (el: HTMLElement, _: Boolean) {
        // @ts-ignore
        const d = el.dataset.index * delay
        setTimeout(() => {
            el.style.opacity = '1'
            // @ts-ignore
            el.style['-webkit-transform'] = 'translateY(0)'
            // @ts-ignore
            el.style['-moz-transform'] = 'translateY(0)'
            el.style.transform = 'translateY(0)'
        }, el.dataset.index == '0' ? startDelay : d)
    }

    return {
        beforeEnter,
        enter
    }
}