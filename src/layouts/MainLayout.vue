<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="row justify-center">
          <q-btn dense flat round to="/overview">
            <q-avatar>
              <img src="icons/logo_white.svg" />
            </q-avatar>
          </q-btn>
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
        to: '/moneytransfers',
      },
      {
        label: () => 'Scheduled Payments',
        to: '/transfers',
      },
      {
        label: () => 'Payments',
        children: [
          {
            label: () => 'Service Payments',
            to: '/servicepayments',
          },
          {
            label: () => 'Government Payments',
            to: '/governmentpayment',
          },
          {
            label: () => 'TELCO Payments',
            to: '/telcopayments',
          },
        ],
      },
      {
        label: () => 'Direct Debit',
        to: '/directdebit',
      },
    ],
  },
  {
    label: () => 'Card Manager',
    to: '/cardmanager',
  },
  {
    label: () => 'Standing Orders',
    to: '/transfers'
  }
];

const pagesRight: SidebarPage[] = [
  {
    label: () => 'Account Settings',
    to: '/deleteaccount',
  },

  {
    label: () => 'Documents',
    children: [
      {
        label: () => 'IBAN Certificate',
        to: '/ibancertificate',
      },

      {
        label: () => 'Account Statements',
        to: '/accountstatement',
      },
    ],
  },
  {
    label: () => 'Log Out',
    to: '/',
  },
];

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
