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
                      <q-btn
                        v-close-popup
                        :label="t('Close')"
                        color="primary"
                        flat
                      />
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
                      <q-btn
                        v-close-popup
                        :label="t('Close')"
                        color="primary"
                        flat
                      />
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
  <!-- <span class="text-caption full-width" style="max-width: 401px"> 30 ago</span> -->

  <q-infinite-scroll
    @load="onLoad"
    :offset="250"
    :disable="!hasMorePages"
    :initial-index="-1"
    :key="queryString"
  >
    <transfer-item
      v-for="transaction in transactions"
      :name="transaction.sender"
      :key="transaction.id"
      :amount="`${transaction.amount > 0 ? '+' : ''}${(
        transaction.amount / 100
      ).toFixed(2)} €`"
      :time="transaction.time"
    />
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios';
import { computed, ref } from 'vue';
import TransferItem from 'src/components/TransferItem.vue';
import { api } from 'src/boot/axios';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const { t } = useI18n();
const transactions = ref([]);

const account = ref(null);

api.get('/api/accounts/').then((response) => {
  console.log(response);
  account.value = response.data;
});

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
    value: 'income',
  },
  {
    label: 'Expense',
    value: 'expense',
  },
];

const date = ref('2019/02/01');

// ?type=INCOME&page=

const queryString = computed(() => {
  //no filter
  if (typeFilter.value == 'none' && filter.value == '')
    return '?page=';

  //income only
  if (typeFilter.value == 'income' && filter.value == '')
    return '?type=income&page=';

  //expense only
  if (typeFilter.value == 'expense' && filter.value == '')
    return '?type=expense&page=';

  //by search word only
  if (typeFilter.value == 'none' && filter.value == '')
    return '?page=&filter.value=op:value';

  //incomes, by search word
  if (typeFilter.value == 'income' && filter.value == '')
    return '?type=income?page=&filter.value=op:value';

  //expenses, by search word
  if (typeFilter.value == 'expense' && filter.value == '')
    return '?type=expense?page=&filter.value=op:value';

  //by dates
  if (typeFilter.value == 'none' && filter.value == '')
    return '?page=';

    // api/transfers/filtered?startDate=01%2F01%2F2022&endDate=01%2F02%2F2022
  return '';


});

async function onLoad(page: number, callback: () => void) {
  try {
    const response = await api.get(`api/transfers/${queryString.value}${page}`);
    transactions.value = [
      ...(transactions.value || []),
      ...response.data.content,
    ];
    if (response.data.page + 1 >= response.data.totalPages) {
      hasMorePages.value = false;
    }
    console.log('test');
    callback();
  } catch (error) {
    $q.notify({
      message: 'You have no more transactions',
      color: 'negative',
    });
    hasMorePages.value = false;
    callback();
  }
}
</script>
