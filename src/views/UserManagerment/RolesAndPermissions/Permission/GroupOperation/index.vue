<template>
  <ul class="group-operation">
    <li
      class="group-operation_item group-operation_item--box-shadow card"
      v-for="operation in operations"
      :key="operation.id"
    >
      <div class="group-operation_box">
        <span class="group-operation_label"
          ><b>{{ operation.label }}</b></span
        >
        <group-action-operation :operation="operation" />
      </div>
      <operation :childOperations="operation.childOperations" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineComponent, defineProps, type PropType } from 'vue'
import type GroupOperationType from '@/types/UserManagerment/RolesAndPermissions/Permission/GroupOperationType'
import Operation from '@/views/UserManagerment/RolesAndPermissions/Permission/Operation/index.vue'
import GroupActionOperation from '@/views/UserManagerment/RolesAndPermissions/Permission/Operation/GroupActionOperation.vue'

const props = defineProps({
  operations: {
    type: Array as PropType<GroupOperationType[]>,
    required: false,
    default: [],
  },
})

const component = defineComponent({
  name: 'GroupOperationAdmin',
  components: { GroupActionOperation },
})
</script>

<style lang="css">
.group-operation {
  list-style-type: none;
}

.group-operation_label {
  display: flex;
  flex: auto;
}

.group-operation_box {
  padding: 10px 20px;
  display: flex;
}

.group-operation_item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.group-operation_item .group-operation_item--box-shadow {
  margin-top: 10px;
}
</style>
