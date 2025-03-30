import { ref } from 'vue'
import api from '@/utils/axiosInstance'

interface ApiResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
  fetchData: () => Promise<void>
}

export function useApi<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  body?: any,
): ApiResponse<T> {
  const data = ref<T | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api[method]<T>(url, body)
      data.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
