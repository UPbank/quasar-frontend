<template>
  <div class="q-pa-xl"></div>
  <q-card class="text-caption full-width" size="dense" bordered>
    <q-card-section padding class="column items-center">
      <div>{{ $t('TELCO Payments') }}</div>
      <div class="q-pa-md">
        <div>{{ $t('Operator') }}</div>
        <div class="q-gutter-xl">
          <q-select filled v-model="operator" :options="options" />
        </div>
        <div>{{ $t('Mobile') }}</div>
        <q-input outlined v-model="phone" mask="## #######" />
        <div>{{ $t('Amount') }}</div>
        <q-input
          outlined
          v-model.number="amount"
          dense
          mask="##.##€"
          style="max-width: 80px"
        />
      </div>
    </q-card-section>

    <q-card-section class="text-center">
      <q-btn unelevated rounded color="primary" :label="t('Continue')" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const operator = ref(null as null | number);
const phone = ref(null as null | number);
const amount = ref(null as null | number);
// const format = (val: number) => `${(val / 100).toFixed(2)} €`;
const model = ref(null);

const options = [
  null,
  'Lycamobile GT Mobile',
  'MEO',
  'MEO Card',
  'MEO Card - PT Hello /PT Card',
  'MEO Card - TelefoneHello',
  'MEO Escola Digital',
  'Moche',
  'NOS',
  'NOS - Escola Digital',
  'SAPO',
  'Sapo ADSL',
  'UZO',
  'Via Card',
  'Vodafone',
  'WTF',
];
</script>
