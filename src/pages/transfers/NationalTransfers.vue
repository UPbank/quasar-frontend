<template>
  <q-form @submit="slide == 'confirm' ? send() : (slide = 'confirm')">
    <h3 class="q-mt-sm text-center">National Transfer</h3>
    <q-card class="text-caption" size="dense">
      <q-card-section>
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
        >
          <q-carousel-slide
            name="input"
            class="column justify-center items-center"
          >
            <span
              class="q-mb-md"
              :class="{
                'text-negative':
                  amount && accounts.active && amount > accounts.active.balance,
              }"
            >
              Balance:
              <template v-if="accounts.active">
                {{ (accounts.active.balance / 100).toFixed(2) }}€
              </template>
              <q-spinner v-else />
            </span>
            <q-input
              v-model.number="amount"
              maxlength="9"
              mask="#.##€"
              fill-mask="0"
              max-val="1000000"
              reverse-fill-mask
              unmasked-value
              borderless
              no-error-icon
              :rules="[
                (v) => !!v,
                (v) => !accounts.active || v <= accounts.active.balance,
              ]"
              :size="(amount || 0).toFixed(2).length - 1"
              :input-class="
                (!amount && triedSubmit) ||
                (amount && accounts.active && amount > accounts.active.balance)
                  ? 'text-center text-h4 text-negative'
                  : 'text-center text-h4'
              "
            />
            <q-input
              v-model="iban"
              label="IBAN"
              prefix="PT50"
              mask="#### #### #### ####### ##"
              placeholder="0000 0000 0000 0000000 00"
              class="full-width"
              unmasked-value
              lazy-rules
              :rules="[(v) => v.length === 21]"
            />
            <q-input
              v-model="note"
              label="Note"
              autogrow
              class="full-width q-my-md"
              maxlength="80"
            />
          </q-carousel-slide>
          <q-carousel-slide
            name="confirm"
            class="column justify-center items-center"
          >
            <h6 class="q-my-md">Amount</h6>
            <div class="text-subtitle1 q-mb-md">
              {{ ((amount || 0) / 100).toFixed(2) }}€
            </div>

            <q-separator />

            <h6 class="q-my-md">Recepient</h6>
            <div class="text-subtitle1 q-mb-md">
              {{
                `PT50
            ${iban.substring(0, 4)}
            ${iban.substring(4, 8)}
            ${iban.substring(8, 12)}
            ${iban.substring(12, 23)}
            ${iban.substring(23)}`
              }}
            </div>

            <q-separator />

            <q-toggle
              label="Make this a standing order"
              v-model="standingOrder"
              class="q-mt-md"
            />
            <q-select
              v-if="standingOrder"
              label="Frequency"
              v-model="operator"
              :options="frequencyOptions"
              emit-value
              map-options
              style="min-width: 200px"
              :rules="[(v) => !!v]"
            />
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>

      <q-card-actions align="between" class="q-px-lg q-pb-lg">
        <q-btn
          flat
          icon="arrow_back"
          v-if="slide == 'confirm'"
          @click="slide = 'input'"
        />
        <div v-else />
        <q-btn
          :icon-right="
            slide == 'confirm'
              ? standingOrder
                ? 'schedule_send'
                : 'send'
              : 'arrow_forward'
          "
          color="primary"
          :label="
            slide == 'confirm'
              ? standingOrder
                ? 'Send and schedule'
                : 'Send'
              : 'Confirmation'
          "
          type="submit"
          @click="triedSubmit = true"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AxiosError } from 'axios';
import { useAccountStore } from 'src/stores/account-store';

const { t } = useI18n();
const $q = useQuasar();
const $router = useRouter();

const accounts = useAccountStore();

const iban = ref('');
const amount = ref(null as null | number);
const note = ref(null as null | string);
const slide = ref('input');
const triedSubmit = ref(false);
const frequencyOptions = [
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
  },
];
const operator = ref(null as null | number);
const standingOrder = ref(false);

const loading = ref(false);

async function send() {
  if (iban.value == null) return;
  if (amount.value == null) return;
  try {
    loading.value = true;
    await api.post('/bank-transfers/', {
      amount: amount.value,
      note: note.value,
      iban: 'PT50' + iban.value,
    });

    if (accounts.active)
      accounts.active.balance = accounts.active.balance - amount.value;
    else console.error('NO ACTIVE ACCOUNT');

    $q.notify({
      message: 'Transfer sent successfuly',
      color: 'positive',
    });

    if (standingOrder.value) {
      try {
        await api.post('/api/standingOrders/', {
          amount: amount.value,
          iban: 'PT50' + iban.value,
          frequency: operator.value,
        });

        $q.notify({
          message: 'Transfer scheduled successfuly',
          color: 'positive',
        });
        $router.push('/transfers');
      } catch (e) {
        console.log(e);
        const error = e as AxiosError;
        if (error.response?.status === 400) {
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
  } catch {
    $q.notify({
      message: 'Failed to Trasfer',
      color: 'negative',
    });
  }
}
</script>
