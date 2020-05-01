import { ref } from '@vue/composition-api'

export default function useClipboard () {
    const isCopied = ref(false)
    const toggle = ref(false)

    function copy (val: string) {
      const el = document.createElement('textarea')
      el.value = val
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    }

    function copyTimeout(v: string, root: any) {
      copy(v)
      resetToggle(2000, root)
    }

    function resetToggle(t: number, root: any) {
      setTimeout(()=>{
        toggle.value = true
        root.$nextTick(()=>{
          toggle.value = false
        })
      }, t)
    }

    return {
        copy,
        isCopied,
        toggle,
        copyTimeout,
        resetToggle
    }
}