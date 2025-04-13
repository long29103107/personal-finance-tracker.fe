<template>
  <div class="category-page">
    <a-card title="Category Management" :bordered="false">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card title="Categories" :bordered="false">
            <a-tree
              v-model:expandedKeys="expandedKeys"
              v-model:selectedKeys="selectedKeys"
              :tree-data="categories"
              :field-names="{ title: 'name', key: 'id', children: 'children' }"
              @select="onSelect"
            />
          </a-card>
        </a-col>

        <a-col :span="12">
          <form-category :formState="formState" :categories="categories" @reset="handleReset" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import FormCategory from '@/views/Category/FormCategory.vue'
import type { TreeProps } from 'ant-design-vue'
import type { DataNode } from 'ant-design-vue/es/tree'
import type CategoryFormType from '@/types/Common/Category/CategoryFormType'

const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const formState = reactive<CategoryFormType>({
  id: 0,
  name: '',
  parentId: null,
})

const categories: TreeProps['treeData'] = [
  {
    id: '1',
    key: '1',
    name: 'Category 1',
    children: [
      {
        id: '2',
        key: '2',
        name: 'Subcategory 1-1',
      },
      {
        id: '3',
        key: '3',
        name: 'Subcategory 1-2',
      },
    ],
  },
  {
    id: '4',
    key: '4',
    name: 'Category 2',
    children: [
      {
        id: '5',
        key: '5',
        name: 'Subcategory 2-1',
      },
    ],
  },
]

const onSelect = (selectedKeys: string, info: any) => {
  const selectedNode = findNodeById(categories, selectedKeys[0])

  if (selectedNode) {
    formState.id = selectedNode.id
    formState.name = selectedNode.name

    const parentNode = categories.find((node) =>
      node.children?.find((child) => child.id === selectedNode.id),
    )

    formState.parentId = parentNode?.id
  }
}

const findNodeById = (nodes: DataNode[], id: string): DataNode | null => {
  for (const node of nodes) {
    if (node.key === id) return node
    if (node.children) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

const handleReset = () => {
  formState.id = 0
  formState.name = ''
  formState.parentId = null
}
</script>

<style scoped>
.category-page {
  padding: 24px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
