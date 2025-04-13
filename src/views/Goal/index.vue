<template>
  <div class="goal-page">
    <a-card title="Goal Management" :bordered="false">
      <a-row :gutter="16">
        <a-col :span="16">
          <a-card title="Goals" :bordered="false">
            <div class="goal-actions">
              <a-button type="primary" @click="onAddNew">Add New Goal</a-button>
            </div>
            <a-table :columns="columns" :data-source="goals" :row-key="(record: Goal) => record.id">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'progress'">
                  <a-progress
                    :percent="Math.round((record.currentAmount / record.targetAmount) * 100)"
                    :status="getProgressStatus(record)"
                  />
                </template>
                <template v-if="column.key === 'targetDate'">
                  {{ formatDate(record.targetDate) }}
                </template>
                <template v-if="column.key === 'action'">
                  <a-space>
                    <a-button type="link" @click="onEdit(record)">
                      <template #icon><EditOutlined /></template>
                    </a-button>
                    <a-button type="link" danger @click="onDelete(record)">
                      <template #icon><DeleteOutlined /></template>
                    </a-button>
                  </a-space>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card
            :title="isEditing ? `Edit Goal: ${selectedGoal?.name}` : 'Add New Goal'"
            :bordered="false"
          >
            <a-form :model="formState" :rules="rules" ref="formRef" layout="vertical">
              <a-form-item label="Goal Name" name="name">
                <a-input v-model:value="formState.name" placeholder="Enter goal name" />
              </a-form-item>
              <a-form-item label="Target Amount" name="targetAmount">
                <a-input-number
                  v-model:value="formState.targetAmount"
                  :min="0"
                  :formatter="(value: number) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item label="Current Amount" name="currentAmount">
                <a-input-number
                  v-model:value="formState.currentAmount"
                  :min="0"
                  :formatter="(value: number) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item label="Target Date" name="targetDate">
                <a-date-picker
                  v-model:value="formState.targetDate"
                  style="width: 100%"
                  :disabled-date="disabledDate"
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
import type { FormInstance } from 'ant-design-vue'
import dayjs from 'dayjs'
import type { TableColumnsType } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'

interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: string
}

const columns: TableColumnsType = [
  {
    title: 'Goal Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Target Amount',
    dataIndex: 'targetAmount',
    key: 'targetAmount',
    align: 'right',
    customRender: ({ text }) => `$${text.toLocaleString()}`,
  },
  {
    title: 'Current Amount',
    dataIndex: 'currentAmount',
    key: 'currentAmount',
    align: 'right',
    customRender: ({ text }) => `$${text.toLocaleString()}`,
  },
  {
    title: 'Progress',
    key: 'progress',
  },
  {
    title: 'Target Date',
    dataIndex: 'targetDate',
    key: 'targetDate',
  },
  {
    title: 'Action',
    key: 'action',
    width: 120,
  },
]

const goals = ref<Goal[]>([
  {
    id: '1',
    name: 'Buy a House',
    targetAmount: 200000,
    currentAmount: 50000,
    targetDate: '2025-12-31',
  },
  {
    id: '2',
    name: 'Emergency Fund',
    targetAmount: 15000,
    currentAmount: 8000,
    targetDate: '2023-12-31',
  },
])

const selectedGoal = ref<Goal | null>(null)
const formRef = ref<FormInstance>()
const isEditing = ref(false)

const formState = reactive({
  name: '',
  targetAmount: 0,
  currentAmount: 0,
  targetDate: undefined as string | undefined,
})

const rules = {
  name: [{ required: true, message: 'Please enter goal name', trigger: 'blur' }],
  targetAmount: [{ required: true, message: 'Please enter target amount', trigger: 'blur' }],
  currentAmount: [{ required: true, message: 'Please enter current amount', trigger: 'blur' }],
  targetDate: [{ required: true, message: 'Please select target date', trigger: 'change' }],
}

const disabledDate = (current: dayjs.Dayjs) => {
  return current && current < dayjs().startOf('day')
}

const formatDate = (date: string) => {
  return dayjs(date).format('MMM DD, YYYY')
}

const getProgressStatus = (goal: Goal) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100
  if (progress >= 100) return 'success'
  if (progress >= 75) return 'normal'
  if (progress >= 50) return 'active'
  return 'exception'
}

const onAddNew = () => {
  isEditing.value = false
  selectedGoal.value = null
  formState.name = ''
  formState.targetAmount = 0
  formState.currentAmount = 0
  formState.targetDate = undefined
}

const onEdit = (goal: Goal) => {
  selectedGoal.value = goal
  formState.name = goal.name
  formState.targetAmount = goal.targetAmount
  formState.currentAmount = goal.currentAmount
  formState.targetDate = goal.targetDate
  isEditing.value = true
}

const onDelete = (goal: Goal) => {
  goals.value = goals.value.filter((g) => g.id !== goal.id)
}

const onSave = async () => {
  try {
    await formRef.value?.validate()
    if (isEditing.value && selectedGoal.value) {
      // Update existing goal
      const index = goals.value.findIndex((g) => g.id === selectedGoal.value?.id)
      if (index !== -1) {
        goals.value[index] = {
          ...selectedGoal.value,
          name: formState.name,
          targetAmount: formState.targetAmount,
          currentAmount: formState.currentAmount,
          targetDate: formState.targetDate || '',
        }
      }
    } else {
      // Add new goal
      const newGoal: Goal = {
        id: Date.now().toString(),
        name: formState.name,
        targetAmount: formState.targetAmount,
        currentAmount: formState.currentAmount,
        targetDate: formState.targetDate || '',
      }
      goals.value.push(newGoal)
    }

    // Reset form
    onCancel()
  } catch (error) {
    console.error('Validation failed:', error)
  }
}

const onCancel = () => {
  selectedGoal.value = null
  formState.name = ''
  formState.targetAmount = 0
  formState.currentAmount = 0
  formState.targetDate = undefined
  isEditing.value = false
}
</script>

<style scoped>
.goal-page {
  padding: 24px;
}

.goal-actions {
  margin-bottom: 16px;
}

:deep(.ant-table-row) {
  cursor: pointer;
}
</style>
