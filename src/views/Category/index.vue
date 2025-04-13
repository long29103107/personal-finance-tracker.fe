<template>
  <div class="category-page">
    <a-card title="Category Management" :bordered="false">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card title="Categories" :bordered="false">
            <div class="category-actions">
              <a-button type="primary" @click="onAddNew">Add New Category</a-button>
            </div>
            <a-tree
              v-model:expandedKeys="expandedKeys"
              v-model:selectedKeys="selectedKeys"
              :tree-data="treeData"
              :field-names="{ title: 'name', key: 'id', children: 'children' }"
              @select="onSelect"
            />
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card
            :title="isEditing ? `Edit Category: ${selectedCategory?.name}` : 'Add New Category'"
            :bordered="false"
          >
            <a-form :model="formState" :rules="rules" ref="formRef" layout="vertical">
              <a-form-item label="Category Name" name="name">
                <a-input v-model:value="formState.name" placeholder="Enter category name" />
              </a-form-item>
              <a-form-item label="Parent Category" name="parentId">
                <a-tree-select
                  v-model:value="formState.parentId"
                  :tree-data="treeData"
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
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { TreeProps } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'

interface Category {
  id: string
  name: string
  parentId?: string
  children?: Category[]
  key?: string
}

const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const selectedCategory = ref<Category | null>(null)
const formRef = ref<FormInstance>()
const isEditing = ref(false)

const formState = reactive({
  name: '',
  parentId: undefined as string | undefined,
})

const rules = {
  name: [{ required: true, message: 'Please enter category name', trigger: 'blur' }],
}

// Sample data - replace with your actual data
const treeData = ref<Category[]>([
  {
    id: '1',
    key: '1',
    name: 'Category 1',
    children: [
      {
        id: '1-1',
        key: '1-1',
        name: 'Subcategory 1-1',
      },
      {
        id: '1-2',
        key: '1-2',
        name: 'Subcategory 1-2',
      },
    ],
  },
  {
    id: '2',
    key: '2',
    name: 'Category 2',
    children: [
      {
        id: '2-1',
        key: '2-1',
        name: 'Subcategory 2-1',
      },
    ],
  },
])

const onAddNew = () => {
  isEditing.value = false
  selectedCategory.value = null
  formState.name = ''
  formState.parentId = undefined
  selectedKeys.value = []
}

const onSelect = (selectedKeys: string[], info: any) => {
  const selectedNode = findNodeById(treeData.value, selectedKeys[0])
  if (selectedNode) {
    selectedCategory.value = selectedNode
    formState.name = selectedNode.name
    formState.parentId = selectedNode.parentId
    isEditing.value = true
  }
}

const findNodeById = (nodes: Category[], id: string): Category | null => {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

const onSave = async () => {
  try {
    await formRef.value?.validate()
    if (isEditing.value && selectedCategory.value) {
      // Update existing category
      const node = findNodeById(treeData.value, selectedCategory.value.id)
      if (node) {
        node.name = formState.name
        node.parentId = formState.parentId
      }
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        key: Date.now().toString(),
        name: formState.name,
        parentId: formState.parentId,
      }

      if (formState.parentId) {
        // Add as child
        const parent = findNodeById(treeData.value, formState.parentId)
        if (parent) {
          if (!parent.children) parent.children = []
          parent.children.push(newCategory)
        }
      } else {
        // Add as root
        treeData.value.push(newCategory)
      }
    }

    // Reset form
    onCancel()
  } catch (error) {
    console.error('Validation failed:', error)
  }
}

const onCancel = () => {
  selectedCategory.value = null
  formState.name = ''
  formState.parentId = undefined
  selectedKeys.value = []
  isEditing.value = false
}
</script>

<style scoped>
.category-page {
  padding: 24px;
}

.category-actions {
  margin-bottom: 16px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
