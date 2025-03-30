import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  // timeout: 10000, // 10 giây timeout
  // withCredentials: true, // Gửi cookies với request
  headers: {
    'Content-Type': 'application/json',
  },
})

// // 👉 Thêm Bearer Token nếu có
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // Lấy token từ localStorage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api
