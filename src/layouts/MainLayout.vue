<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="row justify-center">
          <q-avatar square>
            <img src="icons/logobranco.png" />
          </q-avatar>
        </q-toolbar-title>

        <q-btn dense flat round icon="account_circle">
          <q-popup-proxy side="right" style="width: 200px">
            <q-card style="width: 200px">
              <q-list bordered>
                <sidebar-item
                  v-for="(page, index) in pagesRight"
                  :key="index"
                  :label="page.label()"
                  :children="page.children"
                  :to="page.to"
                />
              </q-list>
            </q-card>
          </q-popup-proxy>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <q-list>
        <sidebar-item
          v-for="(page, index) in pagesLeft"
          :key="index"
          :label="page.label()"
          :children="page.children"
          :to="page.to"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page
        padding
        class="column items-center"
        style="max-width: 1440px; margin-top: 50px"
      >
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CollapsibleSidebarItem from 'src/components/CollapsibleSidebarItem.vue';
import LinkSidebarItem from 'src/components/LinkSidebarItem.vue';
import SidebarPage from 'src/types/SidebarPage';
import SidebarItem from 'components/SidebarItem.vue';

const leftDrawerOpen = ref(true);

const pagesLeft: SidebarPage[] = [
  {
    label: () => 'Transfer and Payments',
    children: [
      {
        label: () => 'Transfer',
        to: '/b',
      },
      {
        label: () => 'Payments',
        children: [
          {
            label: () => 'Service Payments',
            to: '/b',
          },
          {
            label: () => 'Payments to the Government',
            to: '/c',
          },
          {
            label: () => 'TELCO Payments',
            to: '/c',
          },
          {
            label: () => 'Cards',
            to: '/c',
          },
        ],
      },
      {
        label: () => 'Direct Debit',
        to: '/c',
      },
    ],
  },
  {
    label: () => 'Card Manager',
    to: '/d',
  },
  {
    label: () => 'Savings Accounts',
    to: '/e',
  },
];

const pagesRight: SidebarPage[] = [
  {
    label: () => 'Account Settings',
    to: '/h',
  },

  {
    label: () => 'Documents',
    children: [
      {
        label: () => 'IBAN Certificate',
        to: '/g',
      },

      {
        label: () => 'Account Statements',
        to: '/i',
      },
    ],
  },
  {
    label: () => 'Log Out',
    to: '/f',
  },
];

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
