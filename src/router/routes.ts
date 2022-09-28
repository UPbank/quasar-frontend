import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/SessionLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/overview',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/OverView.vue') }],
  },

  {
    path: '/createaccount',
    component: () => import('layouts/SessionLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CreateAccount.vue') },
    ],
  },
  {
    path: '/directdebit',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DirectDebitPage.vue') },
    ],
  },
  {
    path: '/ibancertificate',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IbanCertificatePage.vue') },
    ],
  },
  {
    path: '/governmentpayment',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GovernmentPaymentPage.vue') },
    ],
  },

  {
    path: '/servicepayments',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ServicePaymentsPage.vue') },
    ],
  },
  {
    path: '/telcopayments',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TelcoPaymentsPage.vue') },
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
    path: '/moneytransfers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MoneyTransfersPage.vue') },
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
    path: '/cardmanager',
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
