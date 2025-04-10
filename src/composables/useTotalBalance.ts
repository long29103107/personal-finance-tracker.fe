import { ref, onMounted } from 'vue'
import axiosInstance from '@/utils/axiosInstance'
import URL_CONSTANTS from '@/constants/url-constants'

export function useTotalBalance() {
  const totalBalance = ref<number | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchTotalBalance = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axiosInstance.get(URL_CONSTANTS.TRACKER.DASHBOARD.TOTAL_BALANCES)
      console.log('Total Balance Response:', response.data) // Debugging line
      totalBalance.value = response.data.totalBalance
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch total balance'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchTotalBalance)

  return {
    totalBalance,
    isLoading,
    error,
    fetchTotalBalance,
  }
}
