<template>
  <q-page class="column items-center justify-center q-gutter-y-md">
    <span
      class="text-center text-negative text-weight-medium text-h6"
      style="max-width: 250px"
      >{{ t('deleteaccount.header') }}</span
    >
    <q-card>
      <q-card-section>
        <span class="text-center" style="max-width: 250px">{{
          t('deleteaccount.subheader')
        }}</span>
      </q-card-section>
      <q-card-section class="q-gutter-x-md q-mt-lg">
        <q-btn
          outline
          rounded
          :label="t('deleteaccount.deleteaccount')"
          color="negative"
          @click="deleteaccount"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
function deleteaccount() {
  alert('método');
}
</script>
