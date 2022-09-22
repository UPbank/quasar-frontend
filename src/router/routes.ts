import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/SessionLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/teste',
    component: () => import('layouts/SessionLayout.vue'),
    children: [{ path: '', component: () => import('pages/TestPage.vue') }],
  },
  {
    path: '/CreateAccount',

    component: () => import('layouts/SessionLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CreateAccountPage.vue') },
    ],
  },
  {
    path: '/overview',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/OverView.vue') }],
  },

  {
    path: '/AccountCreation',
    component: () => import('layouts/SessionLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AccountCreation.vue') },
    ],
  },
  {
    path: '/DirectDebit',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DirectDebitPage.vue') },
    ],
  },
  {
    path: '/IbanCertificate',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IbanCertificatePage.vue') },
    ],
  },
  {
    path: '/GovernmentPayment',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GovernmentPaymentPage.vue') },
    ],
  },

  {
    path: '/ServicePayments',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ServicePaymentsPage.vue') },
    ],
  },
  {
    path: '/TelcoPayments',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TelcoPaymentsPage.vue') },
    ],
  },
  {
    path: '/MoneyTransfers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MoneyTransfersPage.vue') },
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
