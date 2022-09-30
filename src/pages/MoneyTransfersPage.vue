<template>
  <div class="q-pa-xl"></div>
  <q-card class="text-caption" size="dense">
    <q-card-section padding class="column items-center">
      <div>Transfer Data</div>
      <div class="q-pa-md">
        <div>IBAN</div>
        <q-input
          outlined
          v-model="iban"
          :rules="[(val) => validateIBAN(val) || 'Must be a valid IBAN.']"
          dense
          style="max-width: 400px"
          lazy-rules
        />
        <div>Amount</div>
        <q-input
          outlined
          v-model="amount"
          dense
          style="max-width: 400px"
          suffix="€"
          :rules="[(v) => v > 0 || 'Must be positive']"
          lazy-rules
        />

        <div>Note</div>
        <q-input outlined v-model="note" dense style="max-width: 400px" />
      </div>
    </q-card-section>

    <div class="q-pa-md" style="max-width: 350px">
      <q-toggle label="Make this a standing order" v-model="standingOrder" />
      <q-select
        v-if="standingOrder"
        label="Frequency"
        filled
        v-model="operator"
        :options="frequencyOptions"
        emit-value
        map-options
      />
    </div>

    <q-card-section class="text-center">
      <q-btn
        unelevated
        rounded
        color="primary"
        :label="t('Continue')"
        @click="send()"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  setup() {
    return {
      model: ref(null),

      frequencyOptions: [
        {
          label: 'Daily',
          value: 'DAILY',
        },
        {
          label: 'Weekly',
          value: 'WEEKLY',
        },
        {
          label: 'Monthly',
          value: 'MONTHLY',
        },
        {
          label: 'Yearly',
          value: 'YEARLY',
          disable: true,
        },
      ],
    };
  },
};
</script>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AxiosError } from 'axios';

const { t } = useI18n();
const $q = useQuasar();
const $router = useRouter();

const iban = ref(null as null | string);
const amount = ref(null as null | number);
const note = ref(null as null | string);
//const frequencyOptions = [null, 'Every Week', 'Every Month', 'Every Year'];
const operator = ref(null as null | number);
const standingOrder = ref(false);

function send() {
  if (iban.value == null) return;
  if (amount.value == null) return;
  try {
    await api.post('/api/transfers/bankTransfers/', {
      amount: amount.value * 100,
      note: note.value,
      iban: iban.value.replace(' ', ''),
    });

    $q.notify({
      message: 'Transfer sent successfuly',
      color: 'positive',
    });
    if (standingOrder.value) {
      try {
        await api.post('/api/standingOrders/', {
          amount: amount.value * 100,
          iban: iban.value.replace(' ', ''),
          frequency: operator.value,
        });

        $q.notify({
          message: 'Transfer scheduled successfuly',
          color: 'positive',
        });
        $router.push('/transfers');
      } catch (e: AxiosError) {
        console.log(e);
        if (e.response?.status === 400) {
          $q.notify({
            message: t('standingOrder.error'),
            color: 'negative',
          });
        } else {
          $q.notify({
            message: t('Failed to schedule'),
            color: 'negative',
          });
        }
      }
    }
    $router.push('/home');

    $q.notify({
      message: 'Transfer sent successfuly',
      color: 'positive',
    });
    $router.push('/home');
  } catch {
    $q.notify({
      message: 'Failed to Trasfer',
      color: 'negative',
    });
  }
}

function validateIBAN(iban: string): boolean {
  return /^PT50\d{21}$/.test(iban);
}
</script>
