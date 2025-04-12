<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="isCollapsed"
      :trigger="null"
      collapsible
      class="admin-layout"
    >
      <logo />
      <menu-sidebar />
    </a-layout-sider>
    <a-layout>
      <header-component :collapsed="isCollapsed" @update:collapsed="handleCollapsed" />
      <welcome-view />

      <div id="user-template">
        <router-view></router-view></div
    ></a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import WelcomeView from '@/views/Dashboard/WelcomeView.vue'
import Logo from '@/views/Common/Menu/Logo.vue'
import MenuSidebar from '@/views/Common/Menu/MenuSidebar.vue'
import HeaderComponent from './HeaderComponent.vue'
import FooterComponent from './ContentAdmin.vue'

const isCollapsed = ref<boolean>(window.innerWidth < 768 ? true : false)

const handleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
}

defineComponent({
  name: 'PageLayout',
  components: {
    HeaderComponent,
  },
})
</script>
