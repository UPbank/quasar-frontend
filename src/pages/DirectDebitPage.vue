<template>
  <div>
    <q-table
      :title="t('Direct Debit')"
      :rows="rows || []"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      hide-pagination
      :loading="rows == null"
    >
      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.active"
            checked-icon="check"
            unchecked-icon="clear"
            @click="toggleDirectDebit(props.row)"
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
import { AxiosError } from 'axios';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const $q = useQuasar();

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

const rows = ref(null as null | []);

api
  .get('/api/directDebits')
  .then((response) => {
    rows.value = response.data.content;
  })
  .catch((error) => {
    $q.notify({ message: t('directDebit.error'), color: 'negative' });
    rows.value = [];
  });

async function toggleDirectDebit(debit: Record<string, unknown>) {
  try {
    debit.active = !debit.active;
    await api.put(`/api/directDebits/${debit.id}`, debit);
  } catch (e) {
    console.log(e);
    if ((e as AxiosError).response?.status === 401) {
      $q.notify({
        message: t('login.incorrect'),
        color: 'negative',
      });
    } else {
      $q.notify({
        message: t('error.general'),
        color: 'negative',
      });
    }
  }
}
</script>
