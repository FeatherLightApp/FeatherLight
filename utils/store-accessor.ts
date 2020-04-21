import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import auth from '~/store/auth'
import settings from '~/store/settings'
import wallet from '~/store/wallet'

let authStore: auth
let settingsStore: settings
let walletStore: wallet

function initialiseStores(store: Store<any>): void {
  authStore = getModule(auth, store)
  settingsStore = getModule(settings, store)
  walletStore = getModule(wallet, store)
}

export { initialiseStores, authStore, settingsStore, walletStore }