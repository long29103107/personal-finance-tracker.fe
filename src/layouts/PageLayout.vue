<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="isCollapsed"
      :trigger="null"
      collapsible
      class="admin-layout"
    >
      <logo-view />
      <menu-sidebar-view />
    </a-layout-sider>
    <a-layout>
      <header-component-layout :collapsed="isCollapsed" @update:collapsed="handleCollapsed" />

      <content-component-layout />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import LogoView from '@/views/Common/Menu/LogoView.vue'
import MenuSidebarView from '@/views/Common/Menu/MenuSidebarView.vue'
import HeaderComponentLayout from './HeaderComponentLayout.vue'
import ContentComponentLayout from './ContentComponentLayout.vue'

const isCollapsed = ref<boolean>(window.innerWidth < 768 ? true : false)

const handleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
}

defineComponent({
  name: 'PageLayout',
  components: {
    HeaderComponentLayout,
    ContentComponentLayout,
  },
})
</script>

<style lang="scss">
@import url('../styles/style.module.scss');
</style>
