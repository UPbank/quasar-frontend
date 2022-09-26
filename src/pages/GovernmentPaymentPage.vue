<template>
  <div class="q-pa-xl"></div>
  <q-card class="text-caption" size="dense">
    <q-card-section padding class="column items-center">
      <div>{{ $t('Government Payment') }}</div>
      <div class="q-pa-md">
        <div>{{ $t('Reference') }}</div>
        <div class="row justify-start items-start content-start q-gutter-sm">
          <q-input
            outlined
            v-model.number="entity"
            dense
            mask="### ### ### ### ###"
            style="max-width: 250px"
          />
        </div>
        <div>{{ $t('Amount') }}</div>
        <q-input
          outlined
          v-model.number="amount"
          dense
          mask="##.##€"
          style="max-width: 100px"
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

const entity = ref(null as null | number);
const amount = ref(null as null | number);
</script>
