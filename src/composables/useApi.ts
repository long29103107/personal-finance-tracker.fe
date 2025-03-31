import { ref } from 'vue'
import api from '@/utils/axiosInstance'
import { type ApiResponse } from '@/types/Api/apiTypes'

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

    console.log('Start fetchData')
    try {
      const headers: Record<string, string> = {}

      // Nếu cần auth, thêm Bearer Token vào headers
      if (auth) {
        const token = localStorage.getItem('token') // Lấy token từ localStorage

        console.log('token', token)
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
      }

      const response = await api.request<T>({
        url,
        method,
        data: body,
        headers, // Truyền headers vào request
      })

      data.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
