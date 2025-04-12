<template>
  <a-layout-header class="header-component">
    <div class="header-left">
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleSidebar" />
      <menu-fold-outlined v-else class="trigger" @click="toggleSidebar" />
    </div>
    <div class="header-right">
      <a-dropdown class="dropdown-menu-header">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1"> Logout </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          <UserOutlined />
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { defineComponent, defineProps, defineEmits, ref } from 'vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  collapsed: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const router = useRouter()

const isCollapsed = ref<boolean>()

const emit = defineEmits(['update:collapsed'])

const toggleSidebar = () => {
  isCollapsed.value = !props.collapsed
  emit('update:collapsed', isCollapsed.value)
}

const handleMenuClick: MenuProps['onClick'] = async (e) => {
  switch (e.key) {
    case '1':
      await handleLogout()
      break
  }
}

const handleLogout = async () => {
  //TODO: Remove token
  //TODO: router.push('/login')
  router.push('/')
}

const component = defineComponent({
  name: 'HeaderComponentLayout',
  components: { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, DownOutlined },
})
</script>

<style scoped>
.header-component {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background: #fff;
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.header-menu {
  margin-left: 20px;
  border-bottom: none;
  flex: 1;
}

.header-menu :deep(.ant-menu-item) {
  margin: 0 10px;
}

.header-right {
  display: flex;
  align-items: center;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.dropdown-menu-header {
  margin-left: auto;
}
</style>
