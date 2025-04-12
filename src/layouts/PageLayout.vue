<template>
  <a-layout class="page-layout">
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

<style lang="scss" scoped>
.page-layout {
  min-height: 100vh;
}

.admin-layout {
  position: fixed;
  left: 0;
  height: 100vh;
  z-index: 1000;
}

:deep(.ant-layout) {
  margin-left: 200px;
}

:deep(.ant-layout-sider-collapsed) + .ant-layout {
  margin-left: 80px;
}

:deep(.ant-layout-header) {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  width: calc(100% - 200px);
}

:deep(.ant-layout-sider-collapsed) + .ant-layout .ant-layout-header {
  width: calc(100% - 80px);
}
</style>
