<template>
  <div v-for="card in cards" :key="card.id" class="pb-4">
    <q-card>
      <q-card-section>
        <div
          class="column justify-between text-white q-pa-md credit-card"
          style="border-radius: 15px; aspect-ratio: 1.59; min-width: 250px"
        >
          <div class="column q-pa-sm q-mb-md">
            <b>CARD NUMBER</b>
            <span class="text-subtitle2">{{ ccFormat(1234567891055824) }}</span>
          </div>
          <div class="row full-width justify-between q-px-sm">
            <div class="column">
              <b class="text-weight-bolder">EXPIRES</b>
              <span>{{ card.expirationDate }}</span>
            </div>
            <div class="column">
              <b>CVV</b>
              <span>xxx</span>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="q-mb-md row justify-center">
        {{ card.name }}
      </q-card-actions>
    </q-card>

    <div class="q-pa-md q-gutter-lg">
      <div>
        <!-- <q-toggle
          :value="card.onlinePayments"
          label="Online Payment"
          left-label
          @input="changeOnline(card)"
        /> -->
        <q-toggle v-model="online" label="Online Payment" left-label />

        <!-- <q-toggle
          :value="card.nfcPayments"
          label="NFC"
          left-label
          @input="changeNfc(card)"
        /> -->
        <q-toggle v-model="nfc" label="NFC" left-label />
      </div>
    </div>

    <q-btn label="Change PIN" @click="changePin(card)"></q-btn>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const $q = useQuasar();

const cards = ref(null as null | []);

const nfc = ref(false);
const online = ref(false);

function ccFormat(num: number | string) {
  return num
    .toString()
    .replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function getCard() {
  api
    .get('/api/cards/')
    .then((response) => {
      console.log(response.data);
      cards.value = response.data;
    })
    .catch((error) => {
      if (error.response && error.response.data.message) {
        return $q.notify({
          message: error.response.data.message,
          color: 'negative',
        });
      }
      $q.notify({ message: t('badRequest.error'), color: 'negative' });
    });
}
getCard();

function changeOnline(card) {
  api
    .put(`/api/cards/${card.id}/`, {
      ...card,
      onlinePayments: !card.nfcPayments,
    })
    .then(() => {
      $q.notify({
        message: 'PIN changed',
        color: 'positive',
      });
      getCard();
    })
    .catch((error) => {
      if (error.response && error.response.data.message) {
        return $q.notify({
          message: error.response.data.message,
          color: 'negative',
        });
      }
      $q.notify({ message: t('badRequest.error'), color: 'negative' });
    });
}

function changeNfc(card) {
  api
    .put(`/api/cards/${card.id}/`, {
      ...card,
      onlinePayments: !card.onlinePayments,
    })
    .then(() => {
      $q.notify({
        message: 'NFC changed',
        color: 'positive',
      });
      getCard();
    })
    .catch((error) => {
      if (error.response && error.response.data.message) {
        return $q.notify({
          message: error.response.data.message,
          color: 'negative',
        });
      }
      $q.notify({ message: t('badRequest.error'), color: 'negative' });
    });
}

function changePin(card) {
  $q.dialog({
    title: 'Set Up a New Pin',
    message: 'New Pin must have 4 Digits',
    prompt: {
      model: '',
      isValid: (val) => val.length == 4,
      type: 'text',
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    api
      .put(`/api/cards/${card.id}/`, {
        ...card,
        pinCode: data,
      })
      .then(() => {
        $q.notify({
          message: 'Pin changed',
          color: 'positive',
        });
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          return $q.notify({
            message: error.response.data.message,
            color: 'negative',
          });
        }
        $q.notify({ message: t('badRequest.error'), color: 'negative' });
      });
  });
}
</script>
<style lang="scss" scoped>
.credit-card {
  background: linear-gradient($primary, $secondary);
  text-shadow: 0 0 3px rgba(0, 0, 0, 1);
}
</style>
