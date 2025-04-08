<!-- filepath: d:\10.PersonalFinanceTracker\personal-finance-tracker.fe\src\components\Common\Header.vue -->
<template>
  <section class="header-center">
    <p class="large-text"><b>Hello</b> Long !</p>
    <p class="large-text">Welcome Back</p>
    <a-button @click="handleCreateSheet">Create Sheet</a-button>
  </section>
</template>

<script lang="ts" setup>
import axiosInstance from '@/utils/axiosInstance'
const handleCreateSheet = async () => {
  console.log('Create Sheet button clicked!')
  try {
    console.log('url', `${import.meta.env.VITE_API_URL}/identity/google/create-sheet`)

    const googleToken = localStorage.getItem('google_token')
    console.log('google_token', googleToken)
    // Gửi yêu cầu đến API
    const res = await axiosInstance.post('http://localhost:5000/identity/google/create-sheet', {
      token: googleToken,
    })
    console.log('Google Sheet Created:', res.data)

    // Kiểm tra phản hồi từ API
    if (res.status === 200) {
      console.log('Sheet URL:', res.data.sheetUrl)

      // Mở Google Sheet trong tab mới
      window.open(res.data.sheetUrl, '_blank')
    } else {
    }
  } catch (err) {
    console.error('Error creating Google Sheet:', err)
  }
}
</script>

<style scoped>
.header-center {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.large-text {
  font-size: 24px;
  font-family: var(--font-family-montserrat);
  margin-bottom: 5px;
}
</style>
