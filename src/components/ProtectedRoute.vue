<template>
  <div>
    <button @click="fetchProtectedData">Get Protected Data</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/utils/axiosInstance";

const message = ref("");

const fetchProtectedData = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await api.get("/auth/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });

    message.value = response.data.message;
  } catch (error) {
    message.value = "Access Denied!";
  }
};
</script>
