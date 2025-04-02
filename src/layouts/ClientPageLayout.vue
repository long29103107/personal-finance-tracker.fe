<template>
  <a-layout>
    <header-component />

    <div id="user-template">
      <router-view></router-view>
    </div>
  </a-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '@/components/Common/HeaderComponent.vue'

defineComponent({
  name: 'ClintPageLayout',
  components: {
    HeaderComponent,
  },
})
</script>
