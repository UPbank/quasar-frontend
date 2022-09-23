<template>
  <q-card>
    <q-card-section class="column items-center">
      <div>Balance</div>
      <div v-if="account" class="text-h5">
        {{ (account.balance / 100).toFixed(2) }} €
      </div>
      <q-spinner v-else size="lg" class="q-mt-md" />
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
import TransferItem from 'src/components/TransferItem.vue';
import { api } from 'src/boot/axios';

const transactions = [
  { id: 1, name: 'Pingo Doce', amount: -1000, time: '12:34' },
  { id: 2, name: 'Deloitte', amount: +300000, time: '10:53' },
];

const account = ref(null);

api.get('/api/accounts/').then((response) => {
  console.log(response);
  account.value = response.data;
});

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

const date = ref('2019/02/01');

function onItemClick() {
  // console.log('Clicked on an Item')
}
</script>
