<template lang="pug">
  v-footer(app padless)
    v-container(fluid).py-0
      v-row(justify='space-between' no-gutters)
        v-col
          v-btn(icon href='https://github.com/seanaye/FeatherLight' target='_blank' )
            v-icon mdi-github
        v-col(cols='auto')
          v-btn(text @click='$router.push("/about")').font-weight-light.px-2.btn-override About FeatherLight
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup () {
  }
})
</script>
<style lang="scss" scoped>

</style>
