<template>
  <GoogleLogin :client-id="clientId" :callback="handleLoginSuccess" />
</template>

<script setup lang="ts">
import { GoogleLogin } from 'vue3-google-login'
import axios from 'axios'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

const handleLoginSuccess = async (response) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/google-login`,
      { token: response.credential },
      { withCredentials: true },
    )

    console.log('Token returned from BE', res)
    localStorage.setItem('Token', res.data.Token)
  } catch (error) {
    console.error('Login Error:', error)
  }
}
</script>
