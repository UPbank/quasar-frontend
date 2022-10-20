<template>
  <div>
    <q-table
      :title="t('transfers.scheduled_payments')"
      :rows="rows || []"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      hide-pagination
      :loading="rows === null"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              color="negative"
              :label="t('transfers.delete')"
              @click="deleteScheduled(props.row.id)"
              icon="delete"
            />
          </q-td>
          <q-td>
            {{ getOrderName(props.row.name) }}
          </q-td>
          <q-td>
            {{ t('transfers.' + props.row.frequency) }}
          </q-td>
          <q-td> {{ props.row.amount.toFixed(2) }}€ </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { QTableProps, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import StandingOrder from 'src/types/StandingOrder';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTranslatedName } from 'src/utils';

const { t } = useI18n();

const $q = useQuasar();

const rows = ref(null as null | StandingOrder[]);

const initialPagination = {
  rowsPerPage: 0,
};
const columns = computed(
  () =>
    [
      {
        name: 'change',
        required: true,
        label: t('standing_orders.change'),
        align: 'left',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: t('transfers.name'),
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'frequency',
        label: t('transfers.frequency'),
        field: 'frequency',
        sortable: true,
      },
      {
        name: 'amount',
        label: t('transfers.amount'),
        field: 'amount',
        sortable: true,
      },
    ] as QTableProps['columns']
);

const frequencyOptions = computed(() => [
  {
    label: t('transfers.daily'),
    value: 'DAILY',
  },
  {
    label: t('transfers.weekly'),
    value: 'WEEKLY',
  },
  {
    label: t('transfers.monthly'),
    value: 'MONTHLY',
  },
  {
    label: t('transfers.yearly'),
    value: 'YEARLY',
  },
]);

api
  .get('/standing-orders/')
  .then((response) => {
    rows.value = response.data;
  })
  .catch(() => {
    $q.notify({
      message: t('standing_orders.error'),
      color: 'negative',
    });
    rows.value = [];
  });

async function deleteScheduled(id: number) {
  $q.dialog({
    title: t('standing_orders.delete'),
    message: t('standing_orders.delete_message'),
    cancel: true,
    persistent: true,
    color: 'negative',
  }).onOk(() => {
    try {
      api.delete(`/standing-orders/${id}/`).then(() => {
        if (rows.value) {
          rows.value = rows.value.filter((x) => x.id != id);
        }

        $q.notify({
          message: t('standing_orders.deleted'),
          color: 'positive',
        });
      });
    } catch (e) {
      console.log(e);
      $q.notify({
        message: t('standing_orders.errors.delete'),
        color: 'negative',
      });
    }
  });
}

function getOrderName(transactionName: string) {
  return getTranslatedName(transactionName, t);
}
</script>
