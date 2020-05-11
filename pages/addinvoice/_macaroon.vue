<template lang="pug">
  v-container
    v-row(justify="center")
      v-col(cols="12" md='10' lg='8')
        v-fade-transition
          receive-lightning(v-if='!loading && validMacaroon')
          

</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { authStore } from '~/store'
import { useAddInvoiceMutation, useCheckMacaroonQuery } from '~/types/ApiTypes'

export default defineComponent({
  components: {
    ReceiveLightning: () => import('~/components/ReceiveLightning.vue')
  },
  setup (_, {root}) {
    authStore.ATTENUATED(root.$nuxt.context.params.macaroon || '')
    const { onResult, loading } = useCheckMacaroonQuery({caveats: []})

    const validMacaroon = ref(false)

    onResult((res) => {
      console.log({res})
      if (res && res.data && res.data.checkMacaroon == null) {
        validMacaroon.value = true
      }
    })

    return {
      loading,
      validMacaroon
    }
  }
})
</script>