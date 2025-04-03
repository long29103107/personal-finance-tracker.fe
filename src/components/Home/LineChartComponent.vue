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
    // Sample data for Line Chart
    const dataValues1 = ref([10, 20, 15, 25, 30])
    const dataValues2 = ref([5, 15, 10, 20, 25]) // Second line
    const dataValues3 = ref([8, 18, 12, 22, 28]) // Third line
    const dataLabels = ref(['January', 'February', 'March', 'April', 'May'])

    // Computed property for chart data
    const lineChartData = computed<ChartData<'line'>>(() => ({
      labels: dataLabels.value,
      datasets: [
        {
          label: 'Monthly Sales',
          data: dataValues1.value,
          borderColor: '#0079AF',
          backgroundColor: 'rgba(0, 121, 175, 0.2)',
          tension: 0.4, // Smooth curve
        },
        {
          label: 'Monthly Expenses', // Second line
          data: dataValues2.value,
          borderColor: '#FF5733',
          backgroundColor: 'rgba(255, 87, 51, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Monthly Profits', // Third line
          data: dataValues3.value,
          borderColor: '#28A745',
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
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
        // title: {
        //   display: true,
        //   text: 'Line Chart Example',
        // },
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
            text: 'Sales',
          },
        },
      },
    }))

    // Use Line Chart hook
    const { lineChartProps, lineChartRef } = useLineChart({
      chartData: lineChartData,
      options: lineChartOptions,
    })

    // Function to update data dynamically
    const addData = () => {
      dataValues.value.push(Math.floor(Math.random() * 50) + 10)
      dataLabels.value.push(`Month ${dataLabels.value.length + 1}`)
    }

    return {
      lineChartProps,
      lineChartRef,
      addData,
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
