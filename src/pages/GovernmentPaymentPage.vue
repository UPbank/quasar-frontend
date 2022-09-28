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
            mask="###############"
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

const { t } = useI18n();
const $q = useQuasar();

const entity = ref(null as null | number);
const amount = ref(null as null | number);

function send() {
  if (entity.value == null) return;
  if (amount.value == null) return;

  api
    .post('/api/transfers/governmentPayments/', {
      entity: entity.value,
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
