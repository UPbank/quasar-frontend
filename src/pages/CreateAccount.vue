<template>
  <q-page class="column items-center justify-center q-gutter-y-md">
    <q-img src="icons/logo.png" style="max-width: 100px" />
    <span class="text-center" style="max-width: 250px">
      {{ t('createaccount.header') }}
    </span>
    <q-card style="min-width: 300px" class="q-mb-sm">
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
            :rules="[(val) => validateZipCode(val) || 'invalid.zipCode']"
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

        <q-card-section class="q-mt-xs full-width">
          <q-btn
            :label="t('login.createaccount')"
            color="primary"
            @click="createAccount"
            class="full-width"
          />
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
    await api.post('/register', {
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
    $router.push('/');
    $q.notify({
      message: t('account.created'),
      color: 'positive',
    });
  } catch (e: AxiosError) {
    console.log(e);
    if (e.response?.status === 400) {
      let message = '';
      for (const error of e.response.data.fieldErrors) {
        message += t(`${error.field}.${error.errorCode}`) + '\n';
      }
      $q.notify({
        message,
        color: 'negative',
      });
    } else if (e.response?.status === 409) {
      $q.notify({
        message: t('register.taken'),
        color: 'negative',
      });
    } else if (e.response?.status === 403) {
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
async function validateEmail(email: string): Promise<boolean> {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

async function validateZipCode(zipCode: string): Promise<boolean> {
  return /^\d{4}(-\d{3})?$/.test(zipCode);
}
</script>
