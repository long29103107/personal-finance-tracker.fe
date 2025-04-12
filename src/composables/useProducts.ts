import { ref, onMounted } from 'vue'
import axios from 'axios'
import type Product from '@/types/Product'
import { exceptionHandler } from '@/utils/exceptionHandler'

const API_URL = 'https://api.example.com/products'

const products = ref<Product[]>([])
const product = ref<Product | null>(null)

export function useProducts() {
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await axios.get(API_URL)
      products.value = response.data
    } catch (err) {
      exceptionHandler.handle(err)
    } finally {
      loading.value = false
    }
  }

  const addProduct = async (product: Product) => {
    try {
      const response = await axios.post(API_URL, product)
      products.value.push(response.data)
    } catch (err) {
      exceptionHandler.handle(err)
    }
  }

  const updateProduct = async (id: Number, updatedProduct: Product) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedProduct)
      const index = products.value.findIndex((p) => p.id === id)
      if (index !== -1) products.value[index] = updatedProduct
    } catch (err) {
      exceptionHandler.handle(err)
    }
  }

  const deleteProduct = async (id: Number) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      products.value = products.value.filter((p) => p.id !== id)
    } catch (err) {
      exceptionHandler.handle(err)
    }
  }

  onMounted(fetchProducts)

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}
