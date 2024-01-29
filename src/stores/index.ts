export * from './menu'
export * from './user'
export * from './login'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
