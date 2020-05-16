<template lang="pug">
  v-app
    v-app-bar(app)
      v-toolbar-title.font-weight-thin FeatherLight
    v-content
        v-container(style='height: 100%;' fluid)
          v-row(style='height: 100%' align='center')
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
