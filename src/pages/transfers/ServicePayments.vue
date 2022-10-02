<template>
  <div class="q-pa-xl"></div>
  <q-card class="text-caption" size="dense">
    <q-card-section padding class="column items-center">
      <div>{{ $t('Service Payment') }}</div>
      <div class="q-pa-md">
        <div>{{ $t('Entity') }}</div>
        <div class="row justify-start items-start content-start q-gutter-sm">
          <q-input
            outlined
            v-model.number="entity"
            dense
            mask="#####"
            style="max-width: 70px"
          />
        </div>
        <div>{{ $t('Reference') }}</div>
        <q-input
          outlined
          v-model.number="reference"
          dense
          mask="#########"
          style="max-width: 110px"
        />
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
      <q-btn
        unelevated
        rounded
        color="primary"
        :label="t('Continue')"
        @click="send"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const { t } = useI18n();

const entity = ref(null as null | number);
const reference = ref(null as null | number);
const amount = ref(null as null | number);

function send() {
  if (entity.value == null) return;
  if (reference.value == null) return;
  if (amount.value == null) return;

  api
    .post('/api/transfers/servicePayments/', {
      entity: entity.value,
      reference: reference.value,
      amount: amount.value,
    })
    .then(() => {
      $q.notify({
        message: 'Transfer sent successfuly',
        color: 'positive',
      });
    })
    .catch((error) => {
      if (error.response) {
        return $q.notify({
          message: error.response.data.message,
          color: 'negative',
        });
      }
      $q.notify({ message: t('badRequest.error'), color: 'negative' });
    });
}
</script>
