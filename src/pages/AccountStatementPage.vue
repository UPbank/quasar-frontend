<template>
  <div class="column items-center">
    <div>{{ $t('Account Statements') }}</div>
  </div>
  <q-card class="q-gutter-x-md q-mt-md row justify-center" style="width: 350px">
    <div class="q-pa-md text-center">
      <div>{{ $t('Month') }}</div>
      <div class="q-gutter-xl">
        <q-select filled v-model="month" :options="options" />
      </div>
    </div>
    <div class="q-pa-md text-center">
      <div>{{ $t('Year') }}</div>
      <div class="q-gutter-xl">
        <q-select filled v-model="year" :options="optionss" />
      </div>
    </div>
  </q-card>
  <q-card-section class="text-right">
    {{ $t('Export') }}
    <q-btn round color="secondary" icon="cloud_upload" @click="exportToPDF" />
    <div id="TestPage" ref="document">
      <div id="element-to-convert">
        <!-- ver como fazer de um ficheiro!-->
      </div>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import html2pdf from 'html2pdf.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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

function exportToPDF() {
  html2pdf(document.getElementById('element-to-convert'), {
    margin: 1,
    filename: 'i-was-html.pdf',
  });
}
</script>
