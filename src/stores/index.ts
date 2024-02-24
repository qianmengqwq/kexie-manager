export * from './menu'
export * from './user'
export * from './login'
export * from './college'
export * from './activity'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia()

store.use(createPersistedState())

export default store
