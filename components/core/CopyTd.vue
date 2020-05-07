<template lang="pug">
  v-tooltip(
    top
    v-model="isCopied"
    :open-on-click="true"
    :open-on-hover="false"
  )
    template(v-slot:activator="{ on }")
      td(@click='copy(text)' v-on='on').text-break {{text}}
    span Copied!
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useClipboard from '~/composition/useClipboard'

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup (text) {
    return useClipboard()
  }
})
</script>