<template>
  <div>
    <!-- Filters -->
    <div class="filters">
      <a-select
        v-model:value="selectedYear"
        placeholder="Select Year"
        style="width: 120px"
        @change="handleYearChange"
      >
        <a-select-option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </a-select-option>
      </a-select>

      <a-select
        v-model:value="selectedMonth"
        placeholder="Select Month"
        style="width: 120px; padding-left: 10px"
        @change="handleMonthChange"
      >
        <a-select-option v-for="(month, index) in months" :key="index" :value="month.id">
          {{ month.label }}
        </a-select-option>
      </a-select>
    </div>

    <!-- Transaction List -->
    <a-table
      :columns="columns"
      :data-source="transactions"
      :row-key="(record) => record.id"
      :style="{ marginTop: '10px' }"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'amount'">
          <span :style="{ color: record.type === 'income' ? 'green' : 'red' }">
            {{ record.amount }}
          </span>
        </template>

        <template v-if="column.key === 'type'">
          <a-tag
            v-if="record.type === 'income'"
            :style="{ backgroundColor: '#22c55e', color: '#fff', borderColor: '#22c55e' }"
          >
            Income
          </a-tag>

          <a-tag
            v-else
            :style="{ backgroundColor: '#ef4444', color: '#fff', borderColor: '#ef4444' }"
          >
            Expense
          </a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MonthType from '@/types/Dashboard/MonthType'

const columns = [
  {
    title: 'Category',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Transaction Date',
    dataIndex: 'transactionDate',
    key: 'transactionDate',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
]
const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1)
const years = ref([2021, 2022, 2023, 2024, 2025])
const months = ref<MonthType[]>([
  { id: 1, label: 'January' },
  { id: 2, label: 'February' },
  { id: 3, label: 'March' },
  { id: 4, label: 'April' },
  { id: 5, label: 'May' },
  { id: 6, label: 'June' },
  { id: 7, label: 'July' },
  { id: 8, label: 'August' },
  { id: 9, label: 'September' },
  { id: 10, label: 'October' },
  { id: 11, label: 'November' },
  { id: 12, label: 'December' },
])
const filteredTransactions = ref([])

const transactions = ref([
  { id: 1, title: 'Groceries', amount: '$50.00', type: 'expense', transactionDate: '2025-04-10' },
  { id: 2, title: 'Salary', amount: '$2000.00', type: 'income', transactionDate: '2025-04-10' },
  { id: 3, title: 'Rent', amount: '$800.00', type: 'expense', transactionDate: '2025-04-10' },
  { id: 4, title: 'Utilities', amount: '$150.00', type: 'expense', transactionDate: '2025-04-10' },
  { id: 5, title: 'Investment', amount: '$500.00', type: 'income', transactionDate: '2025-04-10' },
  { id: 6, title: 'Dining Out', amount: '$100.00', type: 'expense', transactionDate: '2025-04-10' },
  {
    id: 7,
    title: 'Freelance Work',
    amount: '$300.00',
    type: 'income',
    transactionDate: '2025-04-10',
  },
  {
    id: 8,
    title: 'Car Payment',
    amount: '$250.00',
    type: 'expense',
    transactionDate: '2025-04-10',
  },
  { id: 9, title: 'Insurance', amount: '$200.00', type: 'expense', transactionDate: '2025-04-10' },
  { id: 10, title: 'Savings', amount: '$400.00', type: 'income', transactionDate: '2025-04-10' },
  {
    id: 11,
    title: 'Entertainment',
    amount: '$80.00',
    type: 'expense',
    transactionDate: '2025-04-10',
  },
  { id: 12, title: 'Travel', amount: '$600.00', type: 'expense', transactionDate: '2025-04-10' },
])

const handleMonthChange = (month: number) => {
  console.log('handleMonthChange', month)
}

const handleYearChange = (year: number) => {
  console.log('handleYearChange', year)
}

// Pagination configuration
const pagination = {
  pageSize: 10, // Number of items per page
  showSizeChanger: true, // Allow changing page size
  pageSizeOptions: ['10', '20', '40'], // Options for page size
  showQuickJumper: true, // Allow jumping to a specific page
  total: transactions.value.length, // Total number of items
}
</script>

<style scoped>
.transaction-list {
  margin: 0 auto;
}

.item-content {
  display: flex;
  justify-content: space-between;
}

.item-title {
  font-weight: bold;
}

.item-amount {
  color: #52c41a; /* Green color for amounts */
}
</style>
