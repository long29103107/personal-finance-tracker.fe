<template>
  <div>
    <!-- Filters -->
    <div class="filters">
      <a-select
        v-model="selectedYear"
        placeholder="Select Year"
        style="width: 120px"
        @change="filterTransactions"
      >
        <a-select-option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </a-select-option>
      </a-select>

      <a-select
        v-model="selectedMonth"
        placeholder="Select Month"
        style="width: 120px; padding-left: 10px"
        @change="filterTransactions"
      >
        <a-select-option v-for="(month, index) in months" :key="index" :value="index + 1">
          {{ month }}
        </a-select-option>
      </a-select>
    </div>

    <!-- Transaction List -->
    <a-list :data-source="transactions" :pagination="pagination" class="transaction-list">
      <template #renderItem="{ item }">
        <a-list-item>
          <div class="item-content">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-amount">{{ item.amount }}</span>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Sample data for transactions
const transactions = ref([
  { id: 1, title: 'Groceries', amount: '$50.00' },
  { id: 2, title: 'Electricity Bill', amount: '$30.00' },
  { id: 3, title: 'Internet', amount: '$20.00' },
  { id: 4, title: 'Netflix Subscription', amount: '$15.00' },
  { id: 5, title: 'Gym Membership', amount: '$40.00' },
  { id: 6, title: 'Coffee', amount: '$5.00' },
  { id: 7, title: 'Dinner', amount: '$60.00' },
  { id: 8, title: 'Fuel', amount: '$70.00' },
  { id: 9, title: 'Clothing', amount: '$100.00' },
  { id: 10, title: 'Books', amount: '$25.00' },
  { id: 11, title: 'Snacks', amount: '$10.00' },
  { id: 12, title: 'Streaming Service', amount: '$12.00' },
])

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
