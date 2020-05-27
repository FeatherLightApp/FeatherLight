<template lang="pug">
  v-form(lazy-validation @submit.prevent="inspectEndpoint" v-model="isValid")
    v-container
      v-row(justify='center' align='center')
        v-container(fluid)
        v-col(cols="12" md='10' lg='8')
          v-text-field(v-model="field" :rules="[isURL]" outlined label="Recovery Key" :error-messages="errorMsg")
        v-col(cols="12" md='10' lg='8').text-center
            v-btn(type="submit" x-large block :disabled="!isValid")
              | Confirm Endpoint
</template>
<script lang="ts">
import useValidation from "~/composition/useValidation";
import { defineComponent, watch, ref } from '@vue/composition-api'
import useEndpoint from "~/composition/useEndpoint"

export default defineComponent({
  middleware: ['loadAuth', 'assertUnAuthed'],
  setup (_, {root}) {
    const { getEndpoint, reloadInstance } = useEndpoint()
    const { isURL } = useValidation()
    const endpoint = ref(getEndpoint())
    const errorMsg = ref('')


    watch(endpoint, () => errorMsg.value = '')

    const data = {
      query: `
        query {
          API
          version
          network
        }
      `
    }

    console.log({data})

    async function checkEndpoint () {
      const res = await root.$axios.post(endpoint.value, data)
      console.log({res})
      // assert version of FeatherLight API
      if (res.data.API != 'FeatherLight' || +res.data.version < 1) {
        errorMsg.value = 'Invalid Endpoint'
      } else {
        // @ts-ignore
        reloadInstance(root.$route.query.to || '/')
      }
    }

    return {
      isURL,
      endpoint
    }
  }
})
</script>