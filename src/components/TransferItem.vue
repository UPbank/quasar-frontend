<template>
  <q-card style="max-width: 400px; width: 100%" class="q-my-sm">
    <q-item clickable>
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
  </q-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{ name: string; time: string; amount: string }>();
</script>

<style lang="scss" scoped>
.income {
  color: $positive;
}

.expense {
  color: $negative;
}
</style>
