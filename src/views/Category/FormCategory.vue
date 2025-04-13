<template>
  <a-card
    :title="formState.id !== 0 ? `Edit Category: ${formState.name}` : 'Add New Category'"
    :bordered="false"
  >
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item label="Category Name" name="name">
        <a-input v-model:value="formState.name" placeholder="Enter category name" />
      </a-form-item>

      <a-form-item label="Parent Category" name="parentId">
        <a-tree-select
          v-model:value="formState.parentId"
          :tree-data="categories"
          :field-names="{ label: 'name', value: 'id', children: 'children' }"
          placeholder="Select parent category"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="onSave">Save</a-button>
          <a-button @click="onCancel">Cancel</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { DataNode } from 'ant-design-vue/es/tree'
import type CategoryFormType from '@/types/Common/Category/CategoryFormType'
import { ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'

const rules = {
  name: [{ required: true, message: 'Please enter category name', trigger: 'blur' }],
}
const parentCategory = ref<DataNode[]>([])
const formRef = ref<FormInstance>()

const { categories, formState } = defineProps({
  categories: {
    type: Array as PropType<DataNode[]>,
    required: true,
  },
  formState: {
    type: Object as PropType<CategoryFormType>,
    required: true,
  },
})

const emit = defineEmits(['reset'])

const onSave = async () => {
  try {
    await formRef.value?.validate()

    onCancel()
  } catch (error) {
    console.error('Validation failed:', error)
  }
}

const onCancel = () => {
  emit('reset')
}
</script>
