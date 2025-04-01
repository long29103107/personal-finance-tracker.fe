<template>
  <main>Hello Vue</main>
  <div class="text-red-500 text-2xl font-bold">Hello Tailwind CSS!</div>
  <!-- <a-button @click="fetchData" type="primary">Click me</a-button> -->
  <a-button @click="handleLogout" type="primary">Logout</a-button>
</template>
<script lang="ts" setup>
import URL_CONSTANTS from '@/constants/url-constants'
import { useApi } from '@/composables/useApi'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// // 🛠 Gọi API GET users
// const {
//   data: users,
//   loading,
//   error,
//   fetchData,
// } = useApi<{ id: number; name: string }[]>(URL_CONSTANTS.IDENTITY.ROLE, 'get', null, true)

// onMounted(fetchData)

const router = useRouter()

const { fetchData, loading } = useApi<null>(
  `${import.meta.env.VITE_API_URL}${URL_CONSTANTS.AUTH.LOGOUT}`,
  'post',
  null,
  true,
)

const handleLogout = async () => {
  await fetchData()

  localStorage.removeItem('token')

  router.push('/login')
}
</script>
