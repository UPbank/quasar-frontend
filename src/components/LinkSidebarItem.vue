<template>
  <q-item clickable :to="to">
    <q-item-section>
      {{ label }}
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{ label: string; to: string }>();
</script>
