<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <menu-sidebar-item v-for="item in dataMenu" :menuItem="item" :key="item.key" />
  </a-menu>
</template>

<script lang="ts" setup>
import type MenuSidebarItemType from '@/types/MenuSidebarItemType'
import { ref, defineComponent } from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  MenuOutlined,
  GoldOutlined,
  MoneyCollectOutlined,
  FileOutlined,
} from '@ant-design/icons-vue'
import { useRoute } from 'vue-router'
import MenuSidebarItem from './MenuSidebarItem.vue'

const dataMenu: MenuSidebarItemType[] = [
  { key: '1', label: 'Dashboard', icon: VideoCameraOutlined, path: '/' },
  { key: '2', label: 'User Managerment', icon: UserOutlined, path: '/user-managerment' },
  { key: '3', label: 'Category', icon: MenuOutlined, path: '/categories' },
  { key: '4', label: 'Goals', icon: GoldOutlined, path: '/goals' },
  { key: '5', label: 'Budget', icon: MoneyCollectOutlined, path: '/budgets' },
  { key: '6', label: 'Report', icon: FileOutlined, path: '/reports' },
]

const route = useRoute()

const defaultSelectedKey = dataMenu.find((x) => x.path == route.fullPath)?.key ?? '1'

const selectedKeys = ref<string[]>([defaultSelectedKey])

const component = defineComponent({
  name: 'MenuSidebarAdmin',
  component: {
    UserOutlined,
    VideoCameraOutlined,
    MenuSidebarItem,
    MenuOutlined,
    GoldOutlined,
    MoneyCollectOutlined,
    FileOutlined,
  },
})
</script>
