<template>
  <div style="width: auto">
    <line-chart v-bind="lineChartProps" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { LineChart, useLineChart } from 'vue-chart-3'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'LineChartComponent',
  components: { LineChart },
  setup() {
    const expenseData = ref([10, 20, 15, 25, 30, 10, 20, 15, 40, 25, 30, 35])
    const incomeData = ref([5, 15, 10, 20, 25, 10, 20, 15, 25, 30, 35, 40])
    const dataLabels = ref([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ])

    // Computed property for chart data
    const lineChartData = computed<ChartData<'line'>>(() => ({
      labels: dataLabels.value,
      datasets: [
        {
          label: 'Yearly Incomes',
          data: expenseData.value,
          borderColor: '#0079AF',
          backgroundColor: 'rgba(0, 121, 175, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Yearly Expenses',
          data: incomeData.value,
          borderColor: '#FF5733',
          backgroundColor: 'rgba(255, 87, 51, 0.2)',
          tension: 0.4,
        },
      ],
    }))

    // Computed property for chart options
    const lineChartOptions = computed<ChartOptions<'line'>>(() => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Months',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Amounts',
          },
        },
      },
    }))

    const { lineChartProps, lineChartRef } = useLineChart({
      chartData: lineChartData,
      options: lineChartOptions,
    })

    return {
      lineChartProps,
      lineChartRef,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
