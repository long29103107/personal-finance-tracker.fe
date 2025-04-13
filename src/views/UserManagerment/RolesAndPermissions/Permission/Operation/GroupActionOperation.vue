<template>
  <span class="group-operation_action">
    <enabled-override-operation v-if="operation?.currentStatus" />
    <enabled-operation v-else />

    <disabled-override-operation v-if="!operation?.currentStatus" />
    <disabled-operation v-else />
  </span>
</template>

<script lang="ts" setup>
import type OperationType from '@/types/UserManagerment/RolesAndPermissions/Permission/OperationType'
import type GroupOperationType from '@/types/UserManagerment/RolesAndPermissions/Permission/GroupOperationType'
import { defineComponent, type PropType } from 'vue'
import EnabledOperation from '@/views/UserManagerment/RolesAndPermissions/Permission/Operation/EnabledOperation.vue'
import DisabledOperation from '@/views/UserManagerment/RolesAndPermissions/Permission/Operation/DisabledOperation.vue'
import DisabledOverrideOperation from '@/views/UserManagerment/RolesAndPermissions/Permission/Operation/DisabledOverrideOperation.vue'
import EnabledOverrideOperation from '@/views/UserManagerment/RolesAndPermissions/Permission/Operation/EnabledOverrideOperation.vue'

const props = defineProps({
  operation: {
    type: Object as PropType<OperationType | GroupOperationType>,
    required: false,
  },
})

const component = defineComponent({
  name: 'GroupActionAdmin',
  components: {
    EnabledOperation,
    DisabledOperation,
    EnabledOverrideOperation,
    DisabledOverrideOperation,
  },
})
</script>
