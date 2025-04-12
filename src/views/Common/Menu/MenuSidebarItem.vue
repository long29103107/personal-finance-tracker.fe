<template>
  <a-menu-item :key="menuItem.key" style="text-align-last: left">
    <component
      :is="menuItem.icon"
      v-if="menuItem.icon"
      class="menu-icon"
      style="display: inline-flex"
    />
    <span
      ><router-link :to="menuItem.path" class="menu-link"> {{ menuItem.label }}</router-link></span
    >
  </a-menu-item>
</template>

<script lang="ts" setup>
import type MenuSidebarItemType from '@/types/MenuSidebarItemType'
import { defineComponent, defineProps, type PropType } from 'vue'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  menuItem: {
    type: Object as PropType<MenuSidebarItemType>,
    required: true,
  },
})

const component = defineComponent({
  name: 'MenuSidebarItemAdmin',
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  },
})
</script>
