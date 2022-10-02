<template>
  <transition enter-active-class="animated fadeIn" appear :duration="300">
    <q-form @submit="slide == 'confirm' ? send() : (slide = 'confirm')">
      <h3 class="q-mt-sm text-center">
        {{ t('transfers.service_payment') }}
      </h3>
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
                    amount &&
                    accounts.active &&
                    amount > accounts.active.balance,
                }"
              >
                {{ t('account.balance') }}:
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
                  (amount &&
                    accounts.active &&
                    amount > accounts.active.balance)
                    ? 'text-center text-h4 text-negative'
                    : 'text-center text-h4'
                "
              />
              <q-input
                v-model="entity"
                :label="t('transfers.entity')"
                mask="#####"
                class="full-width"
                unmasked-value
                lazy-rules
                :rules="[(v) => v.length === 5]"
              />
              <q-input
                v-model="reference"
                :label="t('transfers.reference')"
                mask="### ### ###"
                class="full-width"
                unmasked-value
                lazy-rules
                :rules="[(v) => v.length === 9]"
              />
            </q-carousel-slide>
            <q-carousel-slide
              name="confirm"
              class="column justify-center items-center"
            >
              <h6 class="q-my-md">{{ t('transfers.amount') }}</h6>
              <div class="text-subtitle1 q-mb-md">
                {{ ((amount || 0) / 100).toFixed(2) }}€
              </div>

              <q-separator />

              <h6 class="q-my-md">{{ t('transfers.entity') }}</h6>
              <div class="text-subtitle1 q-mb-md">
                {{ entity }}
              </div>

              <h6 class="q-my-md">{{ t('transfers.reference') }}</h6>
              <div class="text-subtitle1 q-mb-md">
                {{ reference }}
              </div>
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
            :icon-right="slide == 'confirm' ? 'send' : 'arrow_forward'"
            color="primary"
            :label="
              slide == 'confirm'
                ? t('transfers.send')
                : t('transfers.confirmation')
            "
            type="submit"
            @click="triedSubmit = true"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </transition>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAccountStore } from 'src/stores/account-store';

const { t } = useI18n();
const $q = useQuasar();
const $router = useRouter();

const accounts = useAccountStore();

const entity = ref('');
const reference = ref('');
const amount = ref(null as null | number);

const slide = ref('input');
const triedSubmit = ref(false);

const loading = ref(false);

async function send() {
  if (amount.value == null) return;
  try {
    loading.value = true;
    await api.post('/service-payments/', {
      entity: entity.value,
      reference: reference.value,
      amount: amount.value,
    });

    if (accounts.active)
      accounts.active.balance = accounts.active.balance - amount.value;
    else console.error('NO ACTIVE ACCOUNT');

    $q.notify({
      message: t('transfer.success'),
      color: 'positive',
    });

    $router.push('/home');
  } catch {
    $q.notify({
      message: t('errors.service_payment'),
      color: 'negative',
    });
  }
}
</script>
