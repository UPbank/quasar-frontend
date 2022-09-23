<template>
  <q-page class="column items-center justify-center q-gutter-y-md">
    <q-img src="icons/favicon-128x128.png" style="max-width: 100px" />
    <span class="text-center" style="max-width: 250px">
      {{ t('login.header') }}
    </span>
    <q-card>
      <q-card-section>
        <q-input :label="t('login.email')" v-model="email" type="email" />
        <q-input
          :label="t('login.password')"
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            (v) => v.length >= 8 || 'Password must be 8 digits or longer',
          ]"
          lazy-rules
        />
        <q-input
          :label="t('name')"
          v-model="name"
          :rules="[(v) => v.length <= 80 || t('register.maxChars')]"
          lazy-rules
        />
        <q-input filled v-model="date" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" dense :options="isOver18">
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      :label="t('Close')"
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          :label="t('address1')"
          v-model="name"
          :rules="[(v) => v.length <= 80 || t('register.maxChars')]"
          lazy-rules
        />
        <q-input
          :label="t('address2')"
          v-model="name"
          :rules="[(v) => v.length <= 80 || t('register.maxChars')]"
          lazy-rules
        />
      </q-card-section>
      <q-card-section class="q-gutter-x-md q-mt-lg">
        <q-btn :label="t('login.login')" color="primary" @click="login" />
        <q-btn
          :label="t('login.createAccount')"
          color="primary"
          to="/register"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const name = ref('');
const email = ref('');
const password = ref('');
const isPwd = ref(true);
const date = ref('');
function login() {
  alert('método');
}

function isOver18(birthday: string) {
  const now = new Date();
  const [year, month, day] = birthday.split('/').map(Number);
  const validYear = now.getFullYear() - 18;

  if (year < validYear) return true;
  else if (year > validYear) return false;

  const validMonth = now.getMonth() + 1;
  if (month < validMonth) return true;
  else if (month > validMonth) return false;

  const validDay = now.getDate();
  return day <= validDay;
}
</script>
