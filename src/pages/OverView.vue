<template>
  <div>
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
            <q-input filled v-model="startDate" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="startDate">
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
            <q-input filled v-model="startDate" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="startDate">
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
    <span v-if="!hasMorePages">No more transactions</span>
  </div>
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
    value: 'INCOME',
  },
  {
    label: 'Expense',
    value: 'EXPENSE',
  },
];

const startDate = ref('2019/02/01');
const endDate = ref('2019/02/01');

function getSymbol(currString: string) {
  return currString + (currString == '' ? '?' : '&');
}
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
  result = `${getSymbol(result)}page=`;
  return result;
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
    callback();
  } catch (error) {
    hasMorePages.value = false;
    callback();
    if ((error as AxiosError).response?.status === 401) {
      $q.notify({
        message: t('registration.access.denied'),
        color: 'negative',
      });
    }
  }
}
</script>
