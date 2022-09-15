<template>
  <q-page class="column items-center justify-center q-gutter-y-md">
    <q-img src="icons/favicon-128x128.png" style="max-width: 100px" />
    <span class="text-center" style="max-width: 250px">{{
      t('login.header')
    }}</span>
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
const email = ref('');
const password = ref('');
const isPwd = ref(true);

function login() {
  alert('método');
}
</script>
