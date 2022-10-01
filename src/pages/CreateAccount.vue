<template>
  <q-form class="column items-center justify-center" @submit="createAccount()">
    <q-card style="min-width: 300px" class="q-mb-sm">
      <div class="row justify-between items-center q-mt-md q-ml-md">
        <q-btn icon="arrow_back" round flat to="/" />
        <span class="text-subtitle1 grow"> Create an account </span>
        <div style="width: 40px" />
      </div>
      <q-card-section>
        <q-input
          label="Email"
          v-model="email"
          :rules="[(val) => validateEmail(val)]"
          lazy-rules
        ></q-input>
        <q-input
          :label="t('Password')"
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
            />
          </template>
        </q-input>
        <q-input
          :label="t('Full Name')"
          v-model="fullName"
          maxlength="255"
          :rules="[(v) => !!v]"
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
          :rules="[(v) => !!v]"
          lazy-rules
        />
        <q-input
          :label="t('ID Number')"
          v-model="idNumber"
          maxlength="255"
          :rules="[(v) => !!v]"
          lazy-rules
        />

        <div class="q-mt-lg">Address</div>
        <q-input
          :label="t('Address line 1')"
          v-model="line1"
          maxlength="255"
          :rules="[(v) => !!v]"
          lazy-rules
        />
        <q-input
          :label="t('Address line 2')"
          v-model="line2"
          maxlength="255"
          lazy-rules
          class="q-mb-md"
        />
        <q-input
          :label="t('Postal Code')"
          v-model="zipCode"
          mask="####-###"
          :rules="[(val) => validateZipCode(val)]"
        />
        <q-input
          :label="t('City')"
          v-model="city"
          maxlength="255"
          :rules="[(v) => !!v]"
          lazy-rules
        />
        <q-input
          :label="t('District')"
          v-model="district"
          maxlength="255"
          :rules="[(v) => !!v]"
          lazy-rules
        />
        <q-card-section class="q-mt-xs full-width">
          <q-btn
            :label="t('login.createaccount')"
            color="primary"
            type="submit"
            class="full-width"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const email = ref('');
const password = ref('');
const fullName = ref('');
const birthdate = ref('');
const taxNumber = ref('');
const idNumber = ref('');
const line1 = ref('');
const line2 = ref('');
const zipCode = ref('');
const city = ref('');
const district = ref('');
const isPwd = ref(true);
const $q = useQuasar();
const $router = useRouter();

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
  } catch (e) {
    console.log(e);
    const error = e as AxiosError;
    if (error.response?.status === 400) {
      let message = '';
      for (const errorMsg of error.response?.data.fieldErrors) {
        message += t(`${errorMsg.field}.${errorMsg.errorCode}`) + '\n';
      }
      $q.notify({
        message,
        color: 'negative',
      });
    } else if (error.response?.status === 409) {
      $q.notify({
        message: t('register.taken'),
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
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

async function validateZipCode(zipCode: string): Promise<boolean> {
  return /^\d{4}(-\d{3})?$/.test(zipCode);
}
</script>
