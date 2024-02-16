export * from './menu'
export * from './user'
export * from './login'
export * from './college'
export * from './activity'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
