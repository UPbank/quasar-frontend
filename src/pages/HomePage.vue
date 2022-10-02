<template>
  <transition enter-active-class="animated fadeIn" appear :duration="500">
    <div class="column items-center full-width">
      <q-card class="q-mb-md">
        <q-card-section class="column items-center">
          <div>{{ t('account.balance') }}</div>
          <div v-if="accounts.active" class="text-h5">
            {{ (accounts.active.balance / 100).toFixed(2) }}€
          </div>
          <q-spinner v-else size="lg" class="q-mt-md" />
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section class="row justify-center items-center">
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
            :placeholder="t('transfers.search')"
            debounce="500"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn icon="event" class="q-ml-sm" round flat>
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date rounded standout v-model="date" range dense>
                <div class="row items-center justify-end">
                  <q-btn
                    rounded
                    standout
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
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
          v-for="(transfer, index) in transfers"
          :name="getTransactionName(transfer)"
          :key="transfer.id"
          :amount="`${transfer.type == 'INCOME' ? '+' : '-'}${(
            transfer.amount / 100
          ).toFixed(2)} €`"
          :time="
            new Date(transfer.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          "
          :day="
            index == 0 ||
            transfer.date.substring(0, 10) !=
              transfers[index - 1].date.substring(0, 10)
              ? new Date(transfer.date).toLocaleDateString()
              : ''
          "
        />
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </transition>
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

const options = computed(() => [
  {
    label: t('transfers.all'),
    value: 'none',
  },
  {
    label: t('transfers.income'),
    value: 'INCOME',
  },
  {
    label: t('transfers.expense'),
    value: 'EXPENSE',
  },
]);

const date = ref({} as { from?: string; to?: string });

const nextPage = ref(null as null | string);

function getSymbol(currString: string) {
  return currString + (currString == '' ? '' : '&');
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
  if (date.value.from && date.value.to) {
    result = `${getSymbol(result)}minDate=${date.value.from?.replace(
      /\//g,
      '-'
    )}`;
    result = `${getSymbol(result)}maxDate=${date.value.to?.replace(
      /\//g,
      '-'
    )}`;
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
      query = `${nextPage.value}`;
    } else {
      query = `transfers/?${query}`;
    }
    const response = await api.get(query);
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
