<template>
  <main>Hello Vue</main>
  <div class="text-red-500 text-2xl font-bold">Hello Tailwind CSS!</div>
  <!-- <a-button @click="fetchData" type="primary">Click me</a-button> -->
  <a-button @click="handleLogout" type="primary">Logout</a-button>
</template>
<script lang="ts" setup>
import axiosInstance from '@/utils/axiosInstance'
import { exceptionHandler } from '@/utils/exceptionHandler'
import URL_CONSTANTS from '@/constants/url-constants'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
  try {
    const res = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}${URL_CONSTANTS.AUTH.LOGOUT}`,
    )
  } catch (error) {
    console.log(error)
    exceptionHandler.handle(error)
  }

  localStorage.removeItem('token')

  router.push('/login')
}
</script>
