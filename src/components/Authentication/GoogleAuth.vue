<template>
  <div>
    <GoogleLogin ref="googleLoginBtn" :callback="handleSuccess" class="hidden" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GoogleLogin } from 'vue3-google-login'
import api from '@/utils/axiosInstance'

const googleLoginBtn = ref(null)

const handleSuccess = async (response) => {
  try {
    const { data } = await api.post('/auth/google-login', {
      token: response.credential,
    })

    console.log('Server Response:', data.token)
    localStorage.setItem('token', data.token)
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message)
  }
}

const triggerGoogleLogin = () => {
  if (googleLoginBtn.value) {
    googleLoginBtn.value.$el.click()
  } else {
    console.error('Google login button is not available')
  }
}

// 👉 expose function để App.vue có thể gọi
defineExpose({ triggerGoogleLogin })
</script>
