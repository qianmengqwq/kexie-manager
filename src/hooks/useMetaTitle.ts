import { useRoute } from 'vue-router'

export const useMetaTitle = () => {
  const route = useRoute()
  const { title } = route.meta
  return title
}
