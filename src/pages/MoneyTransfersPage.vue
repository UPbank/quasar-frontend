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
        :options="options"
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

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const $q = useQuasar();
const $router = useRouter();

const iban = ref(null as null | string);
const amount = ref(null as null | number);
const note = ref(null as null | string);
const options = [null, 'Every Week', 'Every Month', 'Every Year'];
const operator = ref(null as null | number);
const standingOrder = ref(false);

async function send() {
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
      // parte da ana
      // try catch novo com os erros da criação da standing order
      //vasempre fazer a trasnferencia, mas só se for standing order é que entra aqui e é que vai agendar
      //TODO
      //fazer issue para a paginação da standing order
      //fazer issue para o PUT do standing order
    }
    $router.push('/overview');
  } catch {
    $q.notify({
      message: 'Error',
      color: 'negative',
    });
  }
}

function validateIBAN(iban: string): boolean {
  return /^PT\d{23}$/.test(iban);
}
</script>
