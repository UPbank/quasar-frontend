import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/SessionLayout.vue'),
    children: [
      { path: '', component: () => import('pages/session/LoginPage.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/SessionLayout.vue'),
    children: [
      { path: '', component: () => import('pages/session/RegisterPage.vue') },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
    meta: {
      name: 'home',
    },
  },
  {
    path: '/transfers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/transfers/TransfersIndex.vue'),
      },
    ],
    meta: {
      name: 'transfers.index',
    },
  },
  {
    path: '/transfers/national-transfers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/transfers/NationalTransfers.vue'),
      },
    ],
    meta: {
      name: 'transfers.national_transfers',
      previous: '/transfers',
    },
  },
  {
    path: '/transfers/service-payments',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/transfers/ServicePayments.vue'),
      },
    ],
    meta: {
      name: 'transfers.service_payments',
      previous: '/transfers',
    },
  },
  {
    path: '/transfers/government-payments',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/transfers/GovernmentPayments.vue'),
      },
    ],
    meta: {
      name: 'transfers.government_payments',
      previous: '/transfers',
    },
  },
  {
    path: '/transfers/telco-payments',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/transfers/TelcoPayments.vue'),
      },
    ],
    meta: {
      name: 'transfers.telco_payments',
      previous: '/transfers',
    },
  },
  {
    path: '/transfers/direct-debits',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/transfers/DirectDebits.vue') },
    ],
    meta: {
      name: 'transfers.direct_debits',
      previous: '/transfers',
    },
  },

  {
    path: '/ibancertificate',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IbanCertificatePage.vue') },
    ],
  },
  {
    path: '/accountstatement',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AccountStatementPage.vue') },
    ],
  },

  {
    path: '/deleteaccount',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DeleteAccount.vue') },
    ],
  },
  {
    path: '/cards',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CardManagerPage.vue') },
    ],
  },
  {
    path: '/transfers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TransfersPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
