<template>
  <q-page class="column items-center justify-center q-gutter-y-md">
    <span
      class="text-center text-negative text-weight-medium text-h6"
      style="max-width: 250px"
      >{{ t('deleteaccount.header') }}
    </span>
    <q-card>
      <q-card-section>
        <span class="text-center" style="max-width: 250px">{{
          t('deleteaccount.subheader')
        }}</span>
      </q-card-section>
      <template v-if="!hasBalance"></template>
      <q-card-section class="q-gutter-x-md q-mt-lg">
        <q-btn
          outline
          rounded
          :label="t('deleteaccount.deleteaccount')"
          color="negative"
          @click="deleteAccount"
        />
      </q-card-section>
    </q-card>
  </q-page>
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
      @click="transferAndDeleteAccountAccount"
    />
  </q-card-section>
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
const has_balance = ref(false);
const iban = ref(null as null | string);

function hasBalance() {
  api
    .get('/api/accounts/') //accounts/?
    .then((response) => {
      has_balance.value = response.data.balance > 0;
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
hasBalance();

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
          has_balance.value = true;
          return;
        }
        return $q.notify({
          message: error.response.data.exception,
          color: 'negative',
        });
      }
      $q.notify({ message: t('badRequest.error'), color: 'negative' });
    });
}

function transferAndDeleteAccountAccount() {
  if (iban.value == null) return;

  api
    .post('/api/accounts/', {
      iban: iban.value,
    })
    .then(() => {
      $q.notify({
        message: 'Transfer sent and account deleted successfuly',
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
