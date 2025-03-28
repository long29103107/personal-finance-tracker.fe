<script setup>
import { GoogleLogin } from 'vue3-google-login'
import axios from 'axios'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const handleLoginSuccess = async (response) => {
  console.log('Google Login Success:', response)

  try {
    // Gửi request đến backend (cập nhật lại URL backend)
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/google`, {
      withCredentials: true, // Cho phép gửi cookie từ backend
    })

    console.log('Backend Response:', res.data)

    // Lưu JWT vào localStorage
    localStorage.setItem('jwt_token', res.data.Token)
  } catch (error) {
    console.error('Login Error:', error)
  }
}

const handleLoginError = () => {
  console.log('Google Login Failed')
}
</script>

<template>
  <GoogleLogin :callback="handleLoginSuccess" prompt :client-id="clientId" />
</template>
