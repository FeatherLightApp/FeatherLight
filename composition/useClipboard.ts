import { ref } from '@vue/composition-api'

export default function useClipboard () {
    const isCopied = ref(false)

    function copy (val: string) {
      const el = document.createElement('textarea')
      el.value = val
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      isCopied.value = true
      document.body.removeChild(el)
      setTimeout(() => {
        isCopied.value = false
      }, 1000)
    }

    return {
      copy,
      isCopied
    }
}