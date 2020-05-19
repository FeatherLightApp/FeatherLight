<template lang="pug">
  v-container(style='height: 80%' fluid)
    v-row(align-content='space-around' style='height: 100%;' justify='center')
      v-col(cols='11' lg='9' xl='7')
          v-row(justify='start')
            v-fade-transition(tag='div' group appear @before-enter='beforeEnter' @enter='enter').px-3
              div(key='1' data-index='1').display-1.font-weight-thin.seed-word Instant Bitcoin Lightning Wallets
              div(key='2' data-index='2').display-1.font-weight-thin.seed-word No Signup
              div(key='3' data-index='3').display-1.font-weight-light.seed-word Fully Anonymous
      v-col(cols='11' align-self='end' lg='9' xl='7')
        v-row(justify="center").px-3
          v-btn(@click="mutateCreate('USER')" :loading="loading" x-large block ripple).my-3 New Wallet
          v-btn(to="/recover" x-large block ripple).my-3 Recover Wallet
          v-col.tertiary--text {{ errorMsg }}
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import { useCreateUserMutation } from '~/types/ApiTypes'
import { authStore } from '~/store'
import useAnimation from '~/composition/useAnimation'

export default defineComponent({
  setup (_, { root }) {
    const { mutate: mutateCreate, loading, onDone } = useCreateUserMutation()
    const errorMsg = ref('')

    onDone((res) => {
      console.log({ res })
      if (res && res.data) {
        authStore.CREATE_USER(res.data)
        if (res.data.createUser.__typename === 'NewUser') {
          root.$router.push('/credentials/')
        } else {
          errorMsg.value = res.data.createUser.message
        }
      }
    })


    return {
      loading,
      mutateCreate,
      errorMsg,
      ...useAnimation(500, 1000)
    }
  }
})
</script>
<style lang="scss" scoped>
.seed-word {
  transition: all 0.5s ease-in-out;
  word-spacing: 0.1rem;
  line-height: 3.6rem;
}
</style>