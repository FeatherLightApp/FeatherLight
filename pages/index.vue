<template lang="pug">
  v-container
    v-row(justify="center")
      v-col(cols="12" md='10' lg='8')
        v-card
          v-progress-linear(v-if='loading' stream buffer-value='0' color="quaternary" absolute top)
          v-container
            v-row(justify='center')
              v-col(cols='12').text-right.overline.py-0
                | Created: {{ walletStore.created }} 
              v-col(cols='12').text-center.primary--text.display-4
                | {{ walletStore.balance }}
                span(v-if='walletStore.created').overline.white--text
                  |&nbsp;{{ settingsStore.currency }}
          v-tabs(v-model='tab' fixed-tabs)
            v-tab(v-for='item in items' :key='item')
              |{{ item }}
          v-divider(light)
          v-expand-transition(mode='out-in')
            receive(v-show='tab === 1 && !loading' key='receive')
          v-expand-transition(mode='out-in')
            transactions(v-if='tab == 2 && !loading' key='tx')


</template>
<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import { useMeQuery } from '~/types/ApiTypes'
import { settingsStore, walletStore } from '../store'

export default defineComponent({
  middleware: ['loadAuth', 'assertAuthed'],
  components: {
    Receive: () => import('~/components/Receive.vue'),
    Transactions: () => import('~/components/Transaction.vue')
  },
  setup () {
    const { loading, onResult } = useMeQuery()

    const tab = ref(1)
    const items = ref(['send', 'receive', 'transactions'])
    onResult((res) => {
      if (res) {
        walletStore.ME(res.data)
      }
    })

    return {
      loading,
      tab,
      items,
      settingsStore,
      walletStore
    }
  }
})
</script>