<template>
  <div style="width: auto">
    <DoughnutChart v-bind="doughnutChartProps" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'DonutChartComponent',
  components: { DoughnutChart },
  setup() {
    const dataValues = ref([40, 20])
    const dataLabels = ref(['Paris', 'Nîmes'])
    const toggleLegend = ref(true)

    const testData = computed<ChartData<'doughnut'>>(() => ({
      labels: dataLabels.value,
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: ['#77CEFF', '#0079AF'],
        },
      ],
    }))

    const options = computed<ChartOptions<'doughnut'>>(() => ({
      scales: {
        myScale: {
          type: 'logarithmic',
          position: toggleLegend.value ? 'left' : 'right',
        },
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? 'top' : 'bottom',
        },
        // title: {
        //   display: true,
        //   text: 'Chart.js Doughnut Chart',
        // },
      },
    }))

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData: testData,
      options,
    })

    let index = ref(20)

    function shuffleData() {
      // dataValues.value = shuffle(dataValues.value);
      dataValues.value.push(index.value)
      dataLabels.value.push('Other' + index.value)
      console.log(dataValues.value)
      console.log(doughnutChartRef.value.chartInstance)
      index.value++
    }

    function switchLegend() {
      toggleLegend.value = !toggleLegend.value
    }

    return {
      shuffleData,
      switchLegend,
      testData,
      options,
      doughnutChartRef,
      doughnutChartProps,
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
