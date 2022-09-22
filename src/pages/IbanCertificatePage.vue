<template>
  <div class="text-left" style="max-width: 300px">
    <q-card>
      <q-card-section id="IBAN" ref="document">
        <div id="element-to-convert">
          <div class="text-center">IBAN Certificate</div>
          <div>Name: John Doe</div>
          <div>Account Number: 0000 123456789101</div>
          <div>IBAN: PT5000 123456789101124214</div>
          <div>Issue Date: 2022/09/19</div>
        </div>
      </q-card-section>

      <q-card-section class="text-right">
        Export
        <q-btn
          round
          color="secondary"
          icon="cloud_upload"
          @click="exportToPDF"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import html2pdf from 'html2pdf.js';
function exportToPDF() {
  html2pdf(document.getElementById('element-to-convert'), {
    margin: 1,
    filename: 'i-was-html.pdf',
    name: 'IBAN',
  });
}
</script>
