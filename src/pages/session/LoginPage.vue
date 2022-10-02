<template>
  <q-form @submit="login()" class="column items-center">
    <q-img src="logo-white-backdrop.svg" width="150px" class="q-mb-xl" />
    <q-card>
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
        <q-btn
          :label="t('login.login')"
          color="primary"
          type="submit"
          :loading="loading"
        />
        <q-btn
          :label="t('login.createaccount')"
          class="q-mt-md"
          flat
          to="/createaccount"
        />
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
const email = ref('tester2@isat.pt');
const password = ref('nicepass');
const loading = ref(false);
const isPwd = ref(true);
const $q = useQuasar();
const $router = useRouter();

function validateEmail(email: string): boolean {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

async function login() {
  try {
    loading.value = true;
    const result = await api.post('/auth/login', {
      username: email.value,
      password: password.value,
    });

    api.defaults.headers.Authorization = `Token ${result.data['token']}`;

    $router.push('/home');
    $q.notify({
      message: t('login.succesful'),
      color: 'positive',
    });
  } catch (e) {
    loading.value = false;
    console.error(e);
    if ((e as AxiosError).response?.status === 401) {
      $q.notify({
        message: t('error.login_credentials'),
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
