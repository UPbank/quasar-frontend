<template>
  <div class="q-pa-xl"></div>
  <q-card class="text-caption" size="dense">
    <q-card-section padding class="column items-center">
      <div>TELCO Payments</div>
      <div class="q-pa-md">
        <div>Operator</div>
        <div class="q-gutter-xl">
          <q-select
            filled
            v-model="operator"
            :options="options"
            label="Filled"
          />
        </div>
        <div>Mobile</div>
        <q-input outlined v-model="phone" mask="+### #########" />
        <div>Amount</div>
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
      <q-btn unelevated rounded color="primary" label="Continue" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const operator = ref(null as null | number);
const phone = ref(null as null | number);
const amount = ref(null as null | number);

const model = ref(null);

const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
</script>
