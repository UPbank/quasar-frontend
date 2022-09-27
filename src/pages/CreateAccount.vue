<template>
  <q-page class="column items-center justify-center q-gutter-y-md">
    <q-img src="icons/logo.png" style="max-width: 100px" />
    <span class="text-center" style="max-width: 250px">
      {{ t('createaccount.header') }}
    </span>
    <q-card>
      <q-card-section>
        <q-input
          label="Email *"
          v-model="email"
          :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"
        ></q-input>
        <q-input
          :label="t('Password *')"
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            (v) => v.length >= 8 || 'Password must be 8 digits or longer',
            (v) => v.length <= 255 || t('createaccount.maxChars'),
          ]"
          lazy-rules
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            /> </template
        ></q-input>
        <q-input
          :label="t('Full Name *')"
          v-model="fullName"
          :rules="[
            (v) => v.length <= 255 || t('createaccount.maxChars'),
            (val) => (val && val.length > 0) || 'Name must be filled in.',
          ]"
          lazy-rules
        />

        <q-input
          :label="t('Birthdate')"
          v-model="birthdate"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  rounded
                  standout
                  v-model="birthdate"
                  dense
                  :options="isOver18"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      rounded
                      standout
                      v-close-popup
                      label="Close"
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
          :label="t('Tax Number')"
          v-model="taxNumber"
          mask="#########"
          :rules="[
            (v) => v.length >= 9 || t('createaccount.nineNumbers'),
            (v) => v.length <= 255 || t('createaccount.maxChars'),
          ]"
          lazy-rules
        />
        <q-input
          :label="t('ID Number')"
          v-model="idNumber"
          mask="########"
          :rules="[
            (v) => v.length >= 8 || t('createaccount.eightNumbers'),
            (v) => v.length <= 255 || t('createaccount.maxChars'),
          ]"
          lazy-rules
        />

        <span class="text-center" style="max-width: 250px">
          {{ t('createaccount.address') }}
        </span>
        <div class="q-pa-xs"></div>
        <q-input
          :label="t('Address line 1')"
          v-model="line1"
          :rules="[(v) => v.length <= 255 || t('createaccount.maxChars')]"
          lazy-rules
        />
        <q-input
          :label="t('Address line 2')"
          v-model="line2"
          :rules="[(v) => v.length <= 255 || t('createaccount.maxChars')]"
          lazy-rules
        />
        <div class="q-gutter-md">
          <q-input
            :label="t('Postal Code')"
            v-model="zipCode"
            mask="####-###"
          />
        </div>
        <div class="q-pa-xs"></div>

        <q-input
          :label="t('City *')"
          v-model="city"
          :rules="[
            (v) => v.length <= 255 || t('createaccount.maxChars'),
            (val) => (val && val.length > 0) || 'Name must be filled in.',
          ]"
          lazy-rules
        />

        <q-input
          :label="t('District *')"
          v-model="district"
          :rules="[
            (v) => v.length <= 255 || t('createaccount.maxChars'),
            (val) => (val && val.length > 0) || 'Name must be filled in.',
          ]"
          lazy-rules
        />

        <q-card-section class="q-gutter-x-md q-mt-xs">
          <q-btn :label="t('login.createaccount')" color="primary" />
          <q-btn :label="t('login.login')" outline color="primary" to="/" />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const email = ref(null as null | string);
const password = ref(null as null | string);
const fullName = ref(null as null | string);
const birthdate = ref('2000-01-01');
const taxNumber = ref(null as null | string);
const idNumber = ref(null as null | string);
const line1 = ref(null as null | string);
const line2 = ref(null as null | string);
const zipCode = ref(null as null | string);
const city = ref(null as null | string);
const district = ref(null as null | string);
const isPwd = ref(true);
const $q = useQuasar();
const $router = useRouter();
// function login() {
//   alert('teste');Postalcode
// }

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

async function createAccount() {
  try {
    const result = await api.post('/register', {
      email: email.value,
      password: password.value,
      fullName: fullName.value,
      birthdate: birthdate.value,
      taxNumber: taxNumber.value,
      idNumber: idNumber.value,
      address: {
        line1: line1.value,
        line2: line2.value,
        zipCode: zipCode.value,
        city: city.value,
        district: district.value,
      },
    });
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${result.data['accessToken']}`;
      return config;
    });
    $router.push('/');

    $q.notify({
      message: t('account.created'),
      color: 'positive',
    });
  } catch (e) {
    console.log(e);
    if ((e as AxiosError).response?.status === 401) {
      $q.notify({
        message: t('email.invalid'),
        color: 'negative',
      });
    } else if ((e as AxiosError).response?.status === 402) {
      $q.notify({
        message: t('register.taken'),
        color: 'negative',
      });
    } else if ((e as AxiosError).response?.status === 403) {
      $q.notify({
        message: t('zip-code.invalid'),
        color: 'negative',
      });
    } else {
      $q.notify({
        message: t('error.general'),
        color: 'negative',
      });
    }
  }
}
</script>
