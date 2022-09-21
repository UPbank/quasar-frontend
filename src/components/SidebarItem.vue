<template>
  <div>
    <collapsible-sidebar-item
      v-if="children"
      :label="label"
      :children="children"
    />
    <link-sidebar-item v-else-if="to" :label="label" :to="to" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import CollapsibleSidebarItem from 'components/CollapsibleSidebarItem.vue';
import LinkSidebarItem from 'components/LinkSidebarItem.vue';
import SidebarPage from 'src/types/SidebarPage';
defineProps<{
  label: string;
  children?: SidebarPage[];
  to?: string;
}>();
</script>
