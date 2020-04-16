<template lang="pug">
  v-app
    v-content
      v-container#align-container
        v-row(justify='start' justify-lg='start' align='center' style='height: 100%;')
          v-container(fluid)
            v-row(justify='center')
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
<style scoped lang="scss">
#align-container {
  height: calc(100vh - 60px);
}
</style>
