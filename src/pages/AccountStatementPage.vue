<template>
  <div class="column items-center">
    <div>Account Statements</div>
  </div>
  <q-card
    class="q-gutter-x-md q-mt-md row justify-center"
    style="height: 130px"
  >
    <div class="q-pa-md text-center">
      <div>Month</div>
      <div class="q-gutter-xl">
        <q-select filled v-model="month" :options="options" />
      </div>
    </div>
    <div class="q-pa-md text-center">
      <div>Year</div>
      <div class="q-gutter-xl">
        <q-select filled v-model="year" :options="optionss" />
      </div>
    </div>
  </q-card>
  <q-card-section class="text-right">
    Export
    <q-btn round color="secondary" icon="cloud_upload" />
  </q-card-section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const month = ref(null as null | number);
const year = ref(null as null | number);
const options = [
  null,
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
];
const optionss = [
  null,
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
];
</script>
