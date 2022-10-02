<template>
  <div class="column items-center full-width">
    <q-card class="q-mb-md">
      <q-card-section class="column items-center">
        <div>Balance</div>
        <div v-if="accounts.active" class="text-h5">
          {{ (accounts.active.balance / 100).toFixed(2) }}€
        </div>
        <q-spinner v-else size="lg" class="q-mt-md" />
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section class="row">
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
          debounce="500"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
    </q-card>

    <q-infinite-scroll
      @load="onLoad"
      :offset="250"
      :disable="!hasMorePages && queryString == prevQueryString"
      class="full-width column items-center q-mt-sm"
      :key="queryString"
    >
      <transfer-item
        v-for="transaction in transfers"
        :name="getTransactionName(transaction)"
        :key="transaction.id"
        :amount="`${transaction.type == 'INCOME' ? '+' : '-'}${(
          transaction.amount / 100
        ).toFixed(2)} €`"
        :time="
          new Date(transaction.date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        "
      />
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import TransferItem from 'src/components/TransferItem.vue';
import { api } from 'src/boot/axios';
import { useI18n } from 'vue-i18n';
import Transfer from 'src/types/Transfer';
import { useAccountStore } from 'src/stores/account-store';

const { t } = useI18n();
const transfers = ref([] as Transfer[]);

const accounts = useAccountStore();

const hasMorePages = ref(true);
const typeFilter = ref('none');
const filter = ref('');

const options = [
  {
    label: 'Show all transactions',
    value: 'none',
  },
  {
    label: 'Income',
    value: 'INCOME',
  },
  {
    label: 'Expense',
    value: 'EXPENSE',
  },
];

const startDate = ref('');
const endDate = ref('');

const nextPage = ref(null as null | string);

function getSymbol(currString: string) {
  return currString + (currString == '' ? '?' : '&');
}

let prevQueryString = ref('');
const queryString = computed(() => {
  let result = '';
  if (typeFilter.value != 'none') {
    result = `${getSymbol(result)}type=${typeFilter.value}`;
  }
  if (filter.value != '') {
    result = `${getSymbol(result)}fromTo=${filter.value}`;
  }
  if (startDate.value != '') {
    result = `${getSymbol(result)}minDate=${startDate.value}`;
  }
  if (startDate.value != '') {
    result = `${getSymbol(result)}maxDate=${endDate.value}`;
  }
  return result;
});

async function onLoad(page: number, callback: () => void) {
  try {
    let query = queryString.value;
    if (query != prevQueryString.value) {
      prevQueryString.value = query;
      transfers.value = [];
      nextPage.value = null;
      hasMorePages.value = true;
    }
    if (nextPage.value != null) {
      query = `${getSymbol(query)}cursor=${nextPage.value}`;
    }
    const response = await api.get(`transfers/${query}`);
    transfers.value = [...(transfers.value || []), ...response.data.results];
    nextPage.value = response.data.next;
    if (nextPage.value == null) {
      hasMorePages.value = false;
    }
    callback();
  } catch (error) {
    console.error(error);
    hasMorePages.value = false;
    callback();
  }
}

function getTransactionName(transaction: Transfer) {
  if (transaction.name.startsWith('_')) {
    return t(`transaction.${transaction.name}`);
  } else {
    return transaction.name;
  }
}
</script>
