<template>
  <group-operation :operations="operations" />
</template>

<script lang="ts" setup>
import GroupOperation from '@/views/UserManagerment/RolesAndPermissions/Permission/GroupOperation/index.vue'
import { defineComponent } from 'vue'
import type GroupOperationType from '@/types/UserManagerment/RolesAndPermissions/Permission/GroupOperationType'

// const

const operations: Array<GroupOperationType> = [
  {
    id: 1,
    label: 'Group 1',
    currentStatus: false,
    childOperations: [
      {
        id: 5,
        label: 'Operation 1 Group 1',
        currentStatus: true,
      },
      {
        id: 6,
        label: 'Operation 2 Group 1',
        currentStatus: true,
      },
    ],
  },
  {
    id: 2,
    label: 'Group 2',
    currentStatus: false,
    childOperations: [
      {
        id: 7,
        label: 'Operation 1 Group 2',
        currentStatus: true,
      },
      {
        id: 8,
        label: 'Operation 2 Group 2',
        currentStatus: true,
      },
    ],
  },
  {
    id: 3,
    label: 'Group 3',
    currentStatus: false,
    childOperations: [
      {
        id: 9,
        label: 'Operation 1 Group 3',
        currentStatus: true,
      },
      {
        id: 10,
        label: 'Operation 2 Group 3',
        currentStatus: true,
      },
    ],
  },
]

const component = defineComponent({
  name: 'GroupOperationAdmin',
  components: { GroupOperation },
})
</script>
