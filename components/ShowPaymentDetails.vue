<template lang="pug">
  v-simple-table
    tbody
      template(v-for='(v, k) in payReq')
        v-tooltip(
          :key='k'
          v-if='!!v && k != "__typename"'
          top
          :open-on-hover='false'
          :disabled='toggle'
        )
          template(v-slot:activator='{ on }')
            tr(v-on='on' @click='copyTimeout(v, $root)' @mouseout='isCopied=false')
              td
                | {{k}}
              td
                | {{v}}
          span
            | {{ 'Copied!' }}
  
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { DecodedInvoice } from '~/types/ApiTypes'
import useClipboard from '~/composition/useClipboard'

export default defineComponent({
  props: {
    payReq: {
      type: Object as () => DecodedInvoice
    }
  },
  setup (props) {
    const { isCopied, copyTimeout, toggle } = useClipboard()

    
    return {
      isCopied,
      copyTimeout,
      toggle
    }
  }
})
</script>