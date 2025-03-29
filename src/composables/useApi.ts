import { ref } from "vue";
import api from "@/utils/axiosInstance";

export function useApi<T>(endpoint: string) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchData = async (params = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get(endpoint, { params });
      data.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Something went wrong!";
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, fetchData };
}
