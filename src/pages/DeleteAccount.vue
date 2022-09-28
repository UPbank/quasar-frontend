<template>
  <q-page class="column items-center justify-center q-gutter-y-md">
    <span
      class="text-center text-negative text-weight-medium text-h6"
      style="max-width: 250px"
      >{{ t('deleteaccount.header') }}</span
    >
    <q-card>
      <q-card-section>
        <span class="text-center" style="max-width: 250px">{{
          t('deleteaccount.subheader')
        }}</span>
      </q-card-section>
      <template v-if="balance == 0">
        <q-card-section class="q-gutter-x-md q-mt-lg">
          <q-btn
            outline
            rounded
            :label="t('deleteaccount.deleteaccount')"
            color="negative"
            @click="deleteAccount"
          />
        </q-card-section>
      </template>
      <template v-else>
        <div class="q-pa-md">
          <div>IBAN</div>
          <div>
            <q-input
              outlined
              v-model="iban"
              dense
              mask="AA#######################"
              style="max-width: 400px"
              maxlength="25"
            />
          </div>
        </div>
        <q-card-section class="q-gutter-x-md q-mt-lg">
          <q-btn
            outline
            rounded
            :label="t('deleteaccount.transfer_and_deleteaccount')"
            color="negative"
            @click="transferAccountBalance"
          />
        </q-card-section>
      </template>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const $q = useQuasar();
const router = useRouter();
const balance = ref(null as null | number);
const iban = ref(null as null | string);

function getBalance() {
  api
    .get('/api/accounts/') //accounts/?
    .then((response) => {
      balance.value = response.data.balance;
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
getBalance();

function deleteAccount() {
  api
    .delete('/api/accounts/')
    .then(() => {
      $q.notify({
        message: 'Account deleted successfuly',
        color: 'positive',
      });
      router.push('/');
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.data.exception === 400) {
          balance.value = 0;
          return;
        }
        if (error.response.data.message) {
          return $q.notify({
            message: error.response.data.message,
            color: 'negative',
          });
        }
      }
      $q.notify({ message: t('badRequest.error'), color: 'negative' });
    });
}

function transferAccountBalance() {
  if (iban.value == null) return;

  api
    .post('/api/transfers/bankTransfers/', {
      amount: balance.value,
      note: 'delete account',
      iban: iban.value,
    })
    .then(() => {
      $q.notify({
        message: 'Transfer sent successfuly',
        color: 'positive',
      });
      deleteAccount();
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
</script>
