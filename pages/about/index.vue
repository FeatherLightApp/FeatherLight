<template lang="pug">
  v-container(fluid)
    v-row(no-gutters justify='center')
      v-col(cols='11' lg='9' xl='7').display-1.font-weight-light
        | FeatherLight is the easiest way to get started on the Bitcoin Lightning Network.
      v-col(cols='11' lg='9' xl='7').subtitle-1.font-weight-light
        | WIP
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  layout: 'plain',
  setup () {

  }
})
</script>