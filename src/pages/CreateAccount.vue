<template>
  <q-page class="column items-center justify-center q-gutter-y-md">
    <q-img src="icons/logo.png" style="max-width: 100px" />
    <span class="text-center" style="max-width: 250px">
      {{ t('createaccount.header') }}
    </span>
    <q-card>
      <q-card-section>
        <q-input
          :label="t('Full Name')"
          rounded
          filled
          v-model="name"
          :rules="[(v) => v.length <= 80 || t('register.maxChars')]"
          lazy-rules
        />

        <q-input
          :label="t('Password')"
          rounded
          filled
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            (v) => v.length >= 8 || 'Password must be 8 digits or longer',
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
          :label="t('Birthdate')"
          filled
          rounded
          v-model="date"
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
                  v-model="date"
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

        <q-input :label="t('Email')" rounded filled v-model="email" />
        <div class="q-pa-xs"></div>
        <q-input
          :label="t('First Address')"
          rounded
          filled
          v-model="staddress"
          :rules="[(v) => v.length <= 80 || t('register.maxChars')]"
          lazy-rules
        />
        <div class="q-gutter-md">
          <q-input
            filled
            rounded
            v-model="postalcode"
            label="Postal Code"
            mask="####-###"
          />
        </div>
        <div class="q-pa-xs"></div>
        <q-input
          :label="t('Second Address')"
          rounded
          filled
          v-model="ndaddress"
          :rules="[(v) => v.length <= 80 || t('register.maxChars')]"
          lazy-rules
        />
        <div class="q-gutter-md">
          <q-input
            rounded
            filled
            v-model="postalcode2"
            :label="t('Postal Code 2')"
            mask="#### - ###"
          />
        </div>
        <div class="q-pa-xs"></div>
        <q-input
          rounded
          filled
          v-model="phone"
          :label="t('Phone')"
          mask="+### #########"
        />
        <div class="q-pa-xs"></div>
        <q-input
          :label="t('ID Number')"
          rounded
          filled
          v-model="idnumber"
          mask="########"
          :rules="[(v) => v.length >= 8 || t('register.8Numbers')]"
          lazy-rules
        />
        <q-input
          :label="t('TAX Number')"
          rounded
          filled
          v-model="taxnumber"
          mask="#########"
          :rules="[(v) => v.length >= 9 || t('register.9Numbers')]"
          lazy-rules
        />
        <q-card-section class="q-gutter-x-md q-mt-xs">
          <q-btn
            :label="t('create')"
            unelevated
            rounded
            color="primary"
            @click="createAccount"
          />
          <q-btn unelevated rounded color="primary" label="Log In" to="/" />
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
const name = ref('');
const email = ref('');
const password = ref('');
const date = ref('');
const staddress = ref('');
const ndaddress = ref('');
const idnumber = ref('');
const taxnumber = ref('');
const postalcode = ref('');
const postalcode2 = ref('');
const phone = ref('');
const city = ref('');
const district = ref('');
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
      fullName: name.value,
      birthdate: date.value,
      taxNumber: taxnumber.value,
      idNumber: idnumber.value,
      address: {
        line1: staddress.value,
        line2: ndaddress.value,
        zipCode: postalcode.value,
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
