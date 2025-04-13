<template>
  <div class="budget-page">
    <a-card title="Budget Management" :bordered="false">
      <a-row :gutter="16">
        <a-col :span="16">
          <a-card title="Budgets" :bordered="false">
            <div class="budget-actions">
              <a-button type="primary" @click="onAddNew">Add New Budget</a-button>
            </div>
            <a-table
              :columns="columns"
              :data-source="budgets"
              :row-key="(record: Budget) => record.id"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'amount'">
                  {{ formatCurrency(record.amount) }}
                </template>
                <template v-if="column.key === 'spent'">
                  {{ formatCurrency(record.spent) }}
                </template>
                <template v-if="column.key === 'remaining'">
                  {{ formatCurrency(record.amount - record.spent) }}
                </template>
                <template v-if="column.key === 'progress'">
                  <a-progress
                    :percent="Math.round((record.spent / record.amount) * 100)"
                    :status="getProgressStatus(record)"
                  />
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
            :title="isEditing ? `Edit Budget: ${selectedBudget?.name}` : 'Add New Budget'"
            :bordered="false"
          >
            <a-form :model="formState" :rules="rules" ref="formRef" layout="vertical">
              <a-form-item label="Budget Name" name="name">
                <a-input v-model:value="formState.name" placeholder="Enter budget name" />
              </a-form-item>
              <a-form-item label="Account" name="accountId">
                <a-select
                  v-model:value="formState.accountId"
                  placeholder="Select account"
                  :options="accounts"
                  :field-names="{ label: 'name', value: 'id' }"
                />
              </a-form-item>
              <a-form-item label="Category" name="category">
                <a-select
                  v-model:value="formState.category"
                  placeholder="Select category"
                  :options="categories"
                />
              </a-form-item>
              <a-form-item label="Amount" name="amount">
                <a-input-number
                  v-model:value="formState.amount"
                  :min="0"
                  :formatter="(value: number) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item label="Spent Amount" name="spent">
                <a-input-number
                  v-model:value="formState.spent"
                  :min="0"
                  :formatter="(value: number) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item label="Period" name="period">
                <a-select
                  v-model:value="formState.period"
                  placeholder="Select period"
                  :options="periods"
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
import type { TableColumnsType } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'

interface Budget {
  id: string
  name: string
  accountId: string
  category: string
  amount: number
  spent: number
  period: string
}

interface Account {
  id: string
  name: string
}

const columns: TableColumnsType = [
  {
    title: 'Budget Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Account',
    dataIndex: 'accountId',
    key: 'accountId',
    customRender: ({ text }) => accounts.value.find((acc) => acc.id === text)?.name || text,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Amount',
    key: 'amount',
    align: 'right',
  },
  {
    title: 'Spent',
    key: 'spent',
    align: 'right',
  },
  {
    title: 'Remaining',
    key: 'remaining',
    align: 'right',
  },
  {
    title: 'Progress',
    key: 'progress',
  },
  {
    title: 'Period',
    dataIndex: 'period',
    key: 'period',
  },
  {
    title: 'Action',
    key: 'action',
    width: 120,
  },
]

const accounts = ref<Account[]>([
  { id: '1', name: 'Main Account' },
  { id: '2', name: 'Savings Account' },
  { id: '3', name: 'Investment Account' },
])

const categories = [
  { value: 'food', label: 'Food & Dining' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'housing', label: 'Housing' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'health', label: 'Health & Fitness' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
]

const periods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]

const budgets = ref<Budget[]>([
  {
    id: '1',
    name: 'Monthly Groceries',
    accountId: '1',
    category: 'food',
    amount: 500,
    spent: 350,
    period: 'monthly',
  },
  {
    id: '2',
    name: 'Transportation',
    accountId: '1',
    category: 'transportation',
    amount: 200,
    spent: 150,
    period: 'monthly',
  },
])

const selectedBudget = ref<Budget | null>(null)
const formRef = ref<FormInstance>()
const isEditing = ref(false)

const formState = reactive({
  name: '',
  accountId: undefined as string | undefined,
  category: undefined as string | undefined,
  amount: 0,
  spent: 0,
  period: undefined as string | undefined,
})

const rules = {
  name: [{ required: true, message: 'Please enter budget name', trigger: 'blur' }],
  accountId: [{ required: true, message: 'Please select account', trigger: 'change' }],
  category: [{ required: true, message: 'Please select category', trigger: 'change' }],
  amount: [{ required: true, message: 'Please enter amount', trigger: 'blur' }],
  spent: [{ required: true, message: 'Please enter spent amount', trigger: 'blur' }],
  period: [{ required: true, message: 'Please select period', trigger: 'change' }],
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`
}

const getProgressStatus = (budget: Budget) => {
  const progress = (budget.spent / budget.amount) * 100
  if (progress >= 100) return 'exception'
  if (progress >= 75) return 'warning'
  return 'normal'
}

const onAddNew = () => {
  isEditing.value = false
  selectedBudget.value = null
  formState.name = ''
  formState.accountId = undefined
  formState.category = undefined
  formState.amount = 0
  formState.spent = 0
  formState.period = undefined
}

const onEdit = (budget: Budget) => {
  selectedBudget.value = budget
  formState.name = budget.name
  formState.accountId = budget.accountId
  formState.category = budget.category
  formState.amount = budget.amount
  formState.spent = budget.spent
  formState.period = budget.period
  isEditing.value = true
}

const onDelete = (budget: Budget) => {
  budgets.value = budgets.value.filter((b) => b.id !== budget.id)
}

const onSave = async () => {
  try {
    await formRef.value?.validate()
    if (isEditing.value && selectedBudget.value) {
      // Update existing budget
      const index = budgets.value.findIndex((b) => b.id === selectedBudget.value?.id)
      if (index !== -1) {
        budgets.value[index] = {
          ...selectedBudget.value,
          name: formState.name,
          accountId: formState.accountId || '',
          category: formState.category || '',
          amount: formState.amount,
          spent: formState.spent,
          period: formState.period || '',
        }
      }
    } else {
      // Add new budget
      const newBudget: Budget = {
        id: Date.now().toString(),
        name: formState.name,
        accountId: formState.accountId || '',
        category: formState.category || '',
        amount: formState.amount,
        spent: formState.spent,
        period: formState.period || '',
      }
      budgets.value.push(newBudget)
    }

    // Reset form
    onCancel()
  } catch (error) {
    console.error('Validation failed:', error)
  }
}

const onCancel = () => {
  selectedBudget.value = null
  formState.name = ''
  formState.accountId = undefined
  formState.category = undefined
  formState.amount = 0
  formState.spent = 0
  formState.period = undefined
  isEditing.value = false
}
</script>

<style scoped>
.budget-page {
  padding: 24px;
}

.budget-actions {
  margin-bottom: 16px;
}

:deep(.ant-table-row) {
  cursor: pointer;
}
</style>
