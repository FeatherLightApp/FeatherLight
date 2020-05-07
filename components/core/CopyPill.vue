<template lang="pug">
  v-tooltip(
    top
    v-model="isCopied"
    :open-on-click="true"
    :open-on-hover="false"
  )
    template(v-slot:activator="{ on }")
      v-chip(@click="copy" v-on="on" v-bind="$attrs")
        | {{ text }}
    | Copied to clipboard!
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import useClipboard from '~/composition/useClipboard'

export default defineComponent({
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup ({ text }) {
    return useClipboard()
  }
})
</script>