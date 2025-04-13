<template>
  <div class="report-page">
    <a-card title="Financial Reports" :bordered="false">
      <a-row :gutter="16">
        <!-- Summary Cards -->
        <a-col :span="6">
          <a-card :bordered="false">
            <template #title>Total Income</template>
            <div class="summary-value">$12,500</div>
            <div class="summary-change positive">+15% vs last month</div>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false">
            <template #title>Total Expenses</template>
            <div class="summary-value">$8,200</div>
            <div class="summary-change negative">+8% vs last month</div>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false">
            <template #title>Savings Rate</template>
            <div class="summary-value">34%</div>
            <div class="summary-change positive">+5% vs last month</div>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false">
            <template #title>Net Worth</template>
            <div class="summary-value">$45,000</div>
            <div class="summary-change positive">+12% vs last month</div>
          </a-card>
        </a-col>

        <!-- Charts Row 1 -->
        <a-col :span="12">
          <a-card title="Income vs Expenses" :bordered="false">
            <div class="chart-container">
              <!-- Placeholder for income vs expenses chart -->
              <div class="chart-placeholder">Income vs Expenses Chart</div>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="Expense Categories" :bordered="false">
            <div class="chart-container">
              <!-- Placeholder for expense categories chart -->
              <div class="chart-placeholder">Expense Categories Chart</div>
            </div>
          </a-card>
        </a-col>

        <!-- Charts Row 2 -->
        <a-col :span="12">
          <a-card title="Monthly Trends" :bordered="false">
            <div class="chart-container">
              <!-- Placeholder for monthly trends chart -->
              <div class="chart-placeholder">Monthly Trends Chart</div>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="Account Balances" :bordered="false">
            <div class="chart-container">
              <!-- Placeholder for account balances chart -->
              <div class="chart-placeholder">Account Balances Chart</div>
            </div>
          </a-card>
        </a-col>

        <!-- Detailed Reports -->
        <a-col :span="24">
          <a-card title="Detailed Reports" :bordered="false">
            <a-tabs v-model:activeKey="activeTab">
              <a-tab-pane key="1" tab="Income Report">
                <a-table :columns="incomeColumns" :data-source="incomeData" :pagination="false">
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'amount'">
                      {{ formatCurrency(record.amount) }}
                    </template>
                    <template v-if="column.key === 'change'">
                      <span :class="record.change >= 0 ? 'positive' : 'negative'">
                        {{ record.change >= 0 ? '+' : '' }}{{ record.change }}%
                      </span>
                    </template>
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Expense Report">
                <a-table :columns="expenseColumns" :data-source="expenseData" :pagination="false">
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'amount'">
                      {{ formatCurrency(record.amount) }}
                    </template>
                    <template v-if="column.key === 'change'">
                      <span :class="record.change >= 0 ? 'positive' : 'negative'">
                        {{ record.change >= 0 ? '+' : '' }}{{ record.change }}%
                      </span>
                    </template>
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="3" tab="Budget vs Actual">
                <a-table :columns="budgetColumns" :data-source="budgetData" :pagination="false">
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'budget'">
                      {{ formatCurrency(record.budget) }}
                    </template>
                    <template v-if="column.key === 'actual'">
                      {{ formatCurrency(record.actual) }}
                    </template>
                    <template v-if="column.key === 'variance'">
                      <span :class="record.variance >= 0 ? 'positive' : 'negative'">
                        {{ formatCurrency(record.variance) }}
                      </span>
                    </template>
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="4" tab="Category Types">
                <a-tree :tree-data="categoryTreeData" :defaultExpandAll="true" :show-line="true">
                  <template #title="{ title, amount, percentage }">
                    <span>{{ title }}</span>
                    <span style="margin-left: 8px; color: #999">
                      {{ formatCurrency(amount) }} ({{ percentage }}%)
                    </span>
                  </template>
                </a-tree>
              </a-tab-pane>
            </a-tabs>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumnsType } from 'ant-design-vue'

const activeTab = ref('1')

const incomeColumns: TableColumnsType = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
  },
  {
    title: 'Change',
    dataIndex: 'change',
    key: 'change',
    align: 'right',
  },
]

const expenseColumns: TableColumnsType = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
  },
  {
    title: 'Change',
    dataIndex: 'change',
    key: 'change',
    align: 'right',
  },
]

const budgetColumns: TableColumnsType = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
    key: 'budget',
    align: 'right',
  },
  {
    title: 'Actual',
    dataIndex: 'actual',
    key: 'actual',
    align: 'right',
  },
  {
    title: 'Variance',
    dataIndex: 'variance',
    key: 'variance',
    align: 'right',
  },
]

const incomeData = [
  {
    category: 'Salary',
    amount: 5000,
    change: 5,
  },
  {
    category: 'Investments',
    amount: 1200,
    change: 12,
  },
  {
    category: 'Freelance',
    amount: 800,
    change: -2,
  },
]

const expenseData = [
  {
    category: 'Housing',
    amount: 1500,
    change: 3,
  },
  {
    category: 'Food',
    amount: 800,
    change: 8,
  },
  {
    category: 'Transportation',
    amount: 400,
    change: -5,
  },
]

const budgetData = [
  {
    category: 'Housing',
    budget: 1500,
    actual: 1450,
    variance: -50,
  },
  {
    category: 'Food',
    budget: 800,
    actual: 850,
    variance: 50,
  },
  {
    category: 'Transportation',
    budget: 400,
    actual: 380,
    variance: -20,
  },
]

const categoryTreeData = [
  {
    title: 'Housing',
    amount: 1500,
    percentage: 30,
    children: [
      {
        title: 'Rent',
        amount: 1200,
        percentage: 24,
      },
      {
        title: 'Utilities',
        amount: 200,
        percentage: 4,
      },
      {
        title: 'Maintenance',
        amount: 100,
        percentage: 2,
      },
    ],
  },
  {
    title: 'Food',
    amount: 800,
    percentage: 16,
    children: [
      {
        title: 'Groceries',
        amount: 500,
        percentage: 10,
      },
      {
        title: 'Dining Out',
        amount: 300,
        percentage: 6,
      },
    ],
  },
  {
    title: 'Transportation',
    amount: 400,
    percentage: 8,
    children: [
      {
        title: 'Public Transit',
        amount: 150,
        percentage: 3,
      },
      {
        title: 'Car Expenses',
        amount: 250,
        percentage: 5,
      },
    ],
  },
  {
    title: 'Entertainment',
    amount: 300,
    percentage: 6,
    children: [
      {
        title: 'Streaming Services',
        amount: 50,
        percentage: 1,
      },
      {
        title: 'Hobbies',
        amount: 250,
        percentage: 5,
      },
    ],
  },
  {
    title: 'Health',
    amount: 200,
    percentage: 4,
    children: [
      {
        title: 'Insurance',
        amount: 100,
        percentage: 2,
      },
      {
        title: 'Medical Expenses',
        amount: 100,
        percentage: 2,
      },
    ],
  },
]

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`
}
</script>

<style scoped>
.report-page {
  padding: 24px;
}

.summary-value {
  font-size: 24px;
  font-weight: bold;
  margin: 8px 0;
}

.summary-change {
  font-size: 14px;
}

.positive {
  color: #52c41a;
}

.negative {
  color: #ff4d4f;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.chart-placeholder {
  color: #999;
  font-size: 16px;
}

:deep(.ant-card-head) {
  border-bottom: none;
}

:deep(.ant-card) {
  margin-bottom: 16px;
}
</style>
