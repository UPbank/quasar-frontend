<template>
  <q-page class="column items-center justify-center q-gutter-y-xl">
    <q-img src="logo-square.svg" style="max-width: 200px" />
    <q-card>
      <q-form @submit="login()">
        <q-card-section>
          <q-input
            :label="t('login.email')"
            v-model="email"
            type="email"
            :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"
          />
          <q-input
            :label="t('login.password')"
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
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
        </q-card-section>
        <q-card-section class="column justify-center">
          <q-btn :label="t('login.login')" color="secondary" type="submit" />
          <q-btn
            :label="t('login.createaccount')"
            class="q-mt-md"
            flat
            color="primary"
            to="/createaccount"
          />
        </q-card-section>
      </q-form>
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
const email = ref('random@upbank.pt');
const password = ref('string');
const isPwd = ref(true);
const $q = useQuasar();
const $router = useRouter();

function validateEmail(email: string): boolean {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

async function login() {
  //success
  try {
    const result = await api.post('/authenticate', {
      email: email.value,
      password: password.value,
    });
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${result.data['accessToken']}`;
      return config;
    });
    $router.push('/home');

    $q.notify({
      message: t('login.succesful'),
      color: 'positive',
    });
    $router.push('/home');

    //error
  } catch (e) {
    console.log(e);
    if ((e as AxiosError).response?.status === 401) {
      $q.notify({
        message: t('login.incorrect'),
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
