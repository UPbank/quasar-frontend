<template>
  <q-card>
    <q-card-section>
      <div
        class="column justify-between bg-black text-white q-pa-md"
        style="border-radius: 15px; aspect-ratio: 1.59; min-width: 250px"
      >
        <div class="column q-pa-sm q-mb-md">
          <b>CARD NUMBER</b>
          <span class="text-subtitle2">{{ ccFormat(1234567891055824) }}</span>
        </div>
        <div class="row full-width justify-between q-px-sm">
          <div class="column">
            <b class="text-weight-bolder">EXPIRES</b>
            <span>12/23</span>
          </div>
          <div class="column">
            <b>CVV</b>
            <span>xxx</span>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="q-mb-md row justify-center">
      Physical Card
    </q-card-actions>
  </q-card>

  <div class="q-pa-md q-gutter-lg">
    <div>
      <q-toggle v-model="online" label="Online Payment" left-label />

      <q-toggle v-model="nfc" label="NFC" left-label />
    </div>
  </div>

  <q-btn label="Change PIN" @click="changePin()"></q-btn>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
const $q = useQuasar();
const nfc = ref(false);
const online = ref(false);

function ccFormat(num: number | string) {
  return num
    .toString()
    .replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function changePin() {
  $q.dialog({
    title: 'Set Up a New Pin',
    message: 'New Pin must have Minimum 4 Digits',
    prompt: {
      model: '',
      isValid: (val) => val.length > 3,
      type: 'text',
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    // console.log('>>>> OK, received', data)
  });
}
</script>
