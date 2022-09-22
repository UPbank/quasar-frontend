<template>
  <q-card>
    <q-card-section class="column items-center">
      <div>Balance</div>
      <div class="text-h5">750.00€</div>
    </q-card-section>
  </q-card>
  <p></p>
  <div>
    <q-card class="row justify-evenly">
      <q-select
        item-aligned
        style="max-width: 300px"
        v-model="typeFilter"
        :options="options"
        emit-value
        map-options
      />
      <q-input
        style="width: 300px"
        class="col self-center"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card>

    <q-card class="my-card full-width">
      <q-card-section>
        <div class="text-h6">Filter by Date</div>
      </q-card-section>
      <q-card-section class="row">
        <div class="q-pa-md" style="max-width: 300px">
          <q-input filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="q-pa-md" style="max-width: 300px">
          <q-input filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <span class="text-caption full-width" style="max-width: 400px"> 30 ago</span>
  <transfer-item
    v-for="transaction in filteredTransactions"
    :name="transaction.name"
    :key="transaction.id"
    :amount="`${transaction.amount > 0 ? '+' : ''}${(
      transaction.amount / 100
    ).toFixed(2)} €`"
    :time="transaction.time"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import CollapsibleSidebarItem from 'src/components/CollapsibleSidebarItem.vue';
import LinkSidebarItem from 'src/components/LinkSidebarItem.vue';
import SidebarPage from 'src/types/SidebarPage';
import TransferItem from 'src/components/TransferItem.vue';
import SidebarItem from 'components/SidebarItem.vue';

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

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

const pagesleft: SidebarPage[] = [
  {
    label: () => 'Tranfer and Payments',
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

const transactions = [
  { id: 1, name: 'Pingo Doce', amount: -1000, time: '12:34' },
  { id: 2, name: 'Deloitte', amount: +300000, time: '10:53' },
];

const typeFilter = ref('none');

const filter = ref('');

const options = [
  {
    label: 'Show all transactions',
    value: 'none',
  },
  {
    label: 'Income',
    value: 'income',
  },
  {
    label: 'Expense',
    value: 'expense',
  },
];

const filteredTransactions = computed(() => {
  let result;
  if (typeFilter.value == 'income') {
    result = getIncome();
  } else if (typeFilter.value == 'expense') {
    result = getExpense();
  } else {
    result = transactions;
  }

  if (filter.value != '') {
    const lowercaseFilter = filter.value.toLowerCase();
    result = result.filter((x) =>
      x.name.toLowerCase().includes(lowercaseFilter)
    );
  }

  return result;
});

function getIncome() {
  return transactions.filter((x) => x.amount > 0);
}

function getExpense() {
  return transactions.filter((x) => x.amount < 0);
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

const date = ref('2019/02/01');

function onItemClick() {
  // console.log('Clicked on an Item')
}
</script>
;
