import { ref } from 'vue'
import type RoleType from '@/types/Common/RoleType'
import { exceptionHandler } from '@/utils/exceptionHandler'
import URL_CONSTANTS from '@/constants/url-constants'

export function useRole() {
  const roles = ref<RoleType[]>([])
  const loading = ref(false)
  const error = ref<unknown | null>(null)
  const fetchRoles = async () => {
    loading.value = true
    error.value = null
    // try {
    //   const { error, data } = await fetchList(URL_CONSTANTS.ROLE.GET_LIST)
    //   roles.value = data.value
    // } catch (err) {
    //   error.value = err
    //   exceptionHandler.handle(err)
    // } finally {
    //   loading.value = false
    // }
  }
  return { roles, loading, error, fetchRoles }
}
