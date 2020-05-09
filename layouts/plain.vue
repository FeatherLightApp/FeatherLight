<template lang="pug">
  v-app
    v-content
      v-container
        v-row(justify='start' justify-lg='start' align='center')#align-row
          nuxt
    core-footer
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    CoreFooter: () => import('~/components/core/Footer.vue')
  }
})
</script>
<style lang="scss" scoped>
#align-row {
  height: calc(100vh - 20px);
}
</style>