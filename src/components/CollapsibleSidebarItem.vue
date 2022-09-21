<template>
  <div>
    <q-item clickable @click="open = !open">
      <q-item-section>
        {{ label }}
      </q-item-section>
      <q-item-section side>
        <q-icon :name="open ? 'expand_less' : 'expand_more'" />
      </q-item-section>
    </q-item>
    <q-slide-transition>
      <div v-show="open" class="q-ml-md">
        <sidebar-item
          v-for="(child, index) in children"
          :key="index"
          :label="child.label()"
          :children="child.children"
          :to="child.to"
        />
      </div>
    </q-slide-transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

import CollapsibleSidebarItem from 'components/CollapsibleSidebarItem.vue';
import LinkSidebarItem from 'components/LinkSidebarItem.vue';
import SidebarPage from 'src/types/SidebarPage';
import SidebarItem from './SidebarItem.vue';
const props = defineProps<{
  label: string;
  children: SidebarPage[];
}>();

const open = ref(false);
</script>
