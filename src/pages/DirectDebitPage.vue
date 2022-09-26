<template>
  <div>
    <q-table
      :title="t('Direct Debit')"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      hide-pagination
    >
      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.active"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-td>
      </template>
    </q-table>
    <div class="q-gutter-x-md q-mt-md full-width row justify-center">
      <q-btn unelevated rounded color="primary" :label="t('Continue')" />
      <q-btn unelevated rounded color="primary" :label="t('Return')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const initialPagination = {
  rowsPerPage: 0,
};
const columns = [
  {
    name: 'active',
    label: () => t('Active/Inactive'),
    align: 'left',
    field: 'active',
  },
  {
    name: 'name',
    required: true,
    label: () => t('Service'),
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'Date of Criation',
    align: 'center',
    label: () => t('Date of Criation'),
    field: 'inicialdate',
    sortable: true,
  },
  {
    name: 'Frequency',
    label: () => t('Frequency'),
    field: 'frequency',
    sortable: true,
  },
  {
    name: 'Amount',
    label: () => t('Amount'),
    field: 'amount',
    format: (val: number) => `${(val / 100).toFixed(2)} €`,
    sortable: true,
  },
];

const rows = ref([
  {
    name: 'John Doe',
    inicialdate: '2021/01/01',
    frequency: 'Monthly',
    amount: 1000,
    active: true,
  },
  {
    name: 'Jane Doe',
    inicialdate: '2020/12/30',
    frequency: 'Weekly',
    amount: 500,
  },
  {
    name: 'UALG Propinas',
    inicialdate: '2015/06/15',
    frequency: 'Weekly',
    amount: '5€',
  },
  {
    name: 'TMN',
    inicialdate: '2015/06/15',
    frequency: 'Weekly',
    amount: '5€',
  },
  {
    name: 'OPTIMUS',
    inicialdate: '2015/06/15',
    frequency: 'Weekly',
    amount: '5€',
  },
  {
    name: 'Freedy Kruger',
    inicialdate: '2015/06/15',
    frequency: 'Weekly',
    amount: '5€',
  },
  {
    name: 'Freedy Kruger2',
    inicialdate: '2015/06/15',
    frequency: 'Weekly',
    amount: '5€',
  },
  {
    name: 'Freedy Kruger3',
    inicialdate: '2015/06/15',
    frequency: 'Weekly',
    amount: '5€',
  },
  {
    name: 'Freedy Kruger4',
    inicialdate: '2015/06/15',
    frequency: 'Weekly',
    amount: '5€',
  },
]);
</script>
