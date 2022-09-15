<template>
  <q-page class="column items-center justify-center q-gutter-y-md">
    Index
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
