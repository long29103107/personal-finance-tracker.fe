<template>
  <a-layout-content class="content-admin">
    <router-view />
  </a-layout-content>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'ContentComponent',
})
</script>

<style scoped>
.content-admin {
  padding: 24px;
  min-height: 280px;
}
</style>
