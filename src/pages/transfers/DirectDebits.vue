<template>
  <transition enter-active-class="animated fadeIn" appear :duration="300">
    <q-table
      :title="t('transfers.direct_debits')"
      :rows="rows || []"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      hide-pagination
      :loading="rows === null"
    >
      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.active"
            checked-icon="check"
            unchecked-icon="clear"
            @update:model-value="toggleDirectDebit(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </transition>
</template>

<script setup lang="ts">
import { useQuasar, QTableProps } from 'quasar';
import { api } from 'src/boot/axios';
import DirectDebit from 'src/types/DirectDebit';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTranslatedName } from 'src/utils';

const { t } = useI18n();
const $q = useQuasar();

const initialPagination = {
  rowsPerPage: 0,
};
const columns = computed(
  () =>
    [
      {
        name: 'id',
        required: true,
        label: t('transfers.reference'),
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'active',
        label: t('transfers.status'),
        align: 'left',
        field: 'active',
      },
      {
        name: 'name',
        required: true,
        label: t('transfers.name'),
        align: 'left',
        field: (row: DirectDebit) => getDebitName(row.name),
        sortable: true,
      },
      {
        name: 'createdAt',
        align: 'center',
        label: t('transfers.date_created'),
        field: (row: DirectDebit) =>
          new Date(row.createdAt).toLocaleDateString(),
        sortable: true,
      },
    ] as QTableProps['columns']
);

const rows = ref(null as null | DirectDebit[]);

api
  .get('/direct-debits/')
  .then((response) => {
    rows.value = response.data;
  })
  .catch(() => {
    $q.notify({ message: t('direct_debit.error'), color: 'negative' });
    rows.value = [];
  });

async function toggleDirectDebit(debit: Record<string, unknown>) {
  try {
    await api.put(`/direct-debits/${debit.id}/`, { active: debit.active });
    $q.notify({
      message: t(`direct_debit.${debit.active ? 'activated' : 'deactivated'}`),
      color: 'positive',
    });
  } catch (e) {
    console.log(e);
    $q.notify({
      message: t('error.general'),
      color: 'negative',
    });
  }
}

function getDebitName(transactionName: string) {
  return getTranslatedName(transactionName, t);
}
</script>
