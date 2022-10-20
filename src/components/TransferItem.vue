<template>
  <div style="display: contents">
    <span v-if="day" class="text-subtitle2 q-mb-md q-mt-lg">{{ day }}</span>
    <q-card style="max-width: 400px; width: 100%" class="q-my-xs">
      <q-item clickable @click="open = !open">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">{{ name[0] }}</q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="column">
            <span>
              {{ name }}
            </span>
            <span class="text-caption">
              {{ time }}
            </span>
          </div>
        </q-item-section>
        <q-item-section
          side
          :class="{ income: amount[0] == '+', expense: amount[0] == '-' }"
        >
          {{ amount }}
        </q-item-section>
      </q-item>

      <q-slide-transition>
        <q-card v-show="open">
          <q-card-section>
            <div id="element-to-convert">
              <div>{{ t('Entity') }}:</div>
              <div>{{ t('Amount') }}:</div>
            </div>
            <div class="cursor-pointer" style="width: 100px">
              {{ notes || 'Add notes' }} <q-icon name="edit" />
              <q-popup-edit v-model="notes" class="text-white">
                <q-input v-model="notes" dense autofocus counter>
                  <template v-slot:append>
                    <q-icon name="edit" />
                  </template>
                </q-input>
              </q-popup-edit>
            </div>
          </q-card-section>

          <q-card-section class="text-right">
            {{ t('Export Transaction') }}
            <q-btn
              round
              color="secondary"
              icon="cloud_upload"
              @click="exportToPDF"
            />
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import html2pdf from 'html2pdf.js';
import { defineProps, ref } from 'vue';
import { useI18n } from 'vue-i18n';
defineProps<{ name: string; day: string; time: string; amount: string }>();
const open = ref(false);
const notes = ref('');

const { t } = useI18n();

function exportToPDF() {
  html2pdf(document.getElementById('element-to-convert'), {
    margin: 1,
    filename: 'Transaction Details.pdf',
    name: 'transaction',
  });
}
</script>

<style lang="scss" scoped>
.income {
  color: $positive !important;
}

.expense {
  color: $negative !important;
}
</style>
