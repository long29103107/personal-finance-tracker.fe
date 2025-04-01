import { ref } from 'vue'
import api from '@/utils/axiosInstance'
import { type ApiResponse } from '@/types/Api/apiTypes'
import { exceptionHandler } from '@/utils/exceptionHandler'

export function useApi<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  body?: any,
  auth: boolean = false,
): ApiResponse<T> {
  const data = ref<T | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      const headers: Record<string, string> = {}

      if (auth) {
        const token = localStorage.getItem('token')

        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
      }

      console.log(`Starting call api ${url}`)
      const response = await api.request<T>({
        url,
        method,
        data: body,
        headers,
      })

      data.value = response.data
    } catch (err: any) {
      exceptionHandler.handle(err)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
