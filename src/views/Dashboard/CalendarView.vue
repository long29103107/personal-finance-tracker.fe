<template>
  <div style="width: 300px; border: 1px solid #d9d9d9; border-radius: 4px">
    <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange">
      <template #headerRender="{ value: current, type, onChange, onTypeChange }">
        <div style="padding: 10px">
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-select
                size="small"
                :dropdown-match-select-width="false"
                class="my-year-select"
                :value="String(current.year())"
                @change="
                  (newYear: number) => {
                    onChange(current.year(+newYear))
                  }
                "
              >
                <a-select-option
                  v-for="val in getYears(current)"
                  :key="String(val)"
                  class="year-item"
                >
                  {{ val }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col>
              <a-select
                size="small"
                :dropdown-match-select-width="false"
                :value="String(current.month())"
                @change="
                  (selectedMonth: number) => {
                    onChange(current.month(parseInt(String(selectedMonth), 10)))
                  }
                "
              >
                <a-select-option
                  v-for="(val, index) in getMonths(current)"
                  :key="String(index)"
                  class="month-item"
                >
                  {{ val }}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </div>
      </template>
    </a-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/en'

const value = ref<Dayjs>()

const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode)
}

const getMonths = (value: Dayjs) => {
  const months = []
  for (let i = 0; i < 12; i++) {
    months.push(value.month(i).format('MMM'))
  }
  return months
}

const getYears = (value: Dayjs) => {
  const year = value.year()
  const years = []
  for (let i = year - 10; i < year + 10; i += 1) {
    years.push(i)
  }
  return years
}
</script>
