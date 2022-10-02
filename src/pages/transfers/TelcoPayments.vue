<template>
  <div class="q-pa-xl"></div>
  <q-card class="text-caption" size="dense" bordered>
    <q-card-section padding class="column items-center">
      <div>{{ $t('TELCO Payments') }}</div>
      <div class="q-pa-md">
        <div>{{ $t('Operator') }}</div>
        <div class="q-gutter-xl">
          <q-select
            filled
            v-model="provider"
            :options="options"
            option-label="name"
            option-value="name"
            emit-values
            map-options
          />
        </div>
        <div>{{ $t('Mobile') }}</div>
        <q-input outlined v-model.number="phone" mask="#########" />
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

const provider = ref(null as null | number);
const phone = ref(null as null | number);
const amount = ref(null as null | number);
// const format = (val: number) => `${(val / 100).toFixed(2)} €`;
const model = ref(null);

const options = ref([]);

api.get('/api/telcoProviders/').then((response) => {
  options.value = response.data;
});
function send() {
  if (provider.value == null) return;
  if (phone.value == null) return;
  if (amount.value == null) return;

  api
    .post('/api/transfers/telcoPayments/', {
      provider: provider.value.name,
      phoneNumber: phone.value,
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
          message: error.response.data.exception,
          color: 'negative',
        });
      }
      $q.notify({ message: t('badRequest.error'), color: 'negative' });
    });
}
</script>
