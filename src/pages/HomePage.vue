<template>
  <main>Hello Vue</main>
  <div class="text-red-500 text-2xl font-bold">Hello Tailwind CSS!</div>
  <a-button @click="fetchData" type="primary">Click me</a-button>
</template>
<script lang="ts" setup>
import URL_CONSTANTS from '@/constants/url-constants'
import { useApi } from '@/composables/useApi'

console.log('URL_CONSTANTS', URL_CONSTANTS.IDENTITY.ROLE)

import { onMounted } from 'vue'

// 🛠 Gọi API GET users
const {
  data: users,
  loading,
  error,
  fetchData,
} = useApi<{ id: number; name: string }[]>(URL_CONSTANTS.IDENTITY.ROLE, 'get')

onMounted(fetchData)
</script>
