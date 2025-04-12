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

      <content-component />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import Logo from '@/views/Common/Menu/Logo.vue'
import MenuSidebar from '@/views/Common/Menu/MenuSidebar.vue'
import HeaderComponent from './HeaderComponent.vue'
import ContentComponent from './ContentComponent.vue'

const isCollapsed = ref<boolean>(window.innerWidth < 768 ? true : false)

const handleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
}

defineComponent({
  name: 'PageLayout',
  components: {
    HeaderComponent,
    ContentComponent,
  },
})
</script>

<style lang="scss">
@import url('../styles/style.module.scss');
</style>
