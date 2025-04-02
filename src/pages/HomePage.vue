<template>
  <main class="main-container">
    <a-row :gutter="[16, 16]">
      <a-col :span="10" :offset="4">
        <a-card title="Line Chart" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="Calendar" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="mt-8">
      <a-col :span="10" :offset="4">
        <a-card title="Transaction" :bordered="false">
          <transaction-component />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="Donut Chart" :bordered="false">
          <donut-chart-component />
        </a-card>

        <a-card title="Total Balance" :bordered="false" class="mt-8">
          <p>$7,540.00</p>
          <p>+8,00%</p>
        </a-card>
      </a-col>
    </a-row>
  </main>
  <!-- <a-button @click="handleLogout" type="primary">Logout</a-button> -->
</template>
<script lang="ts" setup>
import axiosInstance from '@/utils/axiosInstance'
import { exceptionHandler } from '@/utils/exceptionHandler'
import URL_CONSTANTS from '@/constants/url-constants'
import { useRouter } from 'vue-router'
import DonutChartComponent from '@/components/Home/DonutChartComponent.vue'
import TransactionComponent from '@/components/Home/TransactionComponent.vue'

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

<style scoped>
.main-container {
  padding: 20px;
}
</style>
