<template>
  <div class="login-container">
    <a-card class="login-card flex justify-center">
      <GoogleLogin
        :client-id="clientId"
        :callback="handleLoginSuccess"
        :scopes="scopes"
        prompt="consent"
      />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { GoogleLogin } from 'vue3-google-login'
import axiosInstance from '@/utils/axiosInstance'
import { exceptionHandler } from '@/utils/exceptionHandler'
import { useRouter } from 'vue-router'
import URL_CONSTANTS from '@/constants/url-constants'

const router = useRouter()

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const scopes = [
  'email',
  'profile',
  'openid',
  'https://www.googleapis.com/auth/spreadsheets', // Yêu cầu quyền truy cập Google Sheets
]

const handleLoginSuccess = async (response) => {
  try {
    console.log('response.credential', response.credential)

    const res = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}${URL_CONSTANTS.AUTH.LOGIN_GOOGLE}`,
      { token: response.credential },
      { withCredentials: true },
    )

    localStorage.setItem('google_token', response.credential)
    localStorage.setItem('token', res.data.accessToken)

    router.push('/')
  } catch (err) {
    console.log(err)
    exceptionHandler.handle(err)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
