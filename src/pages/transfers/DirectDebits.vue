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
            @update:model-value="toggleDirectDebit(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const $q = useQuasar();

const initialPagination = {
  rowsPerPage: 0,
};
const columns = computed(() => [
  {
    name: 'id',
    required: true,
    label: t('directDebit.reference'),
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'active',
    label: t('directDebit.status'),
    align: 'left',
    field: 'active',
  },
  {
    name: 'name',
    required: true,
    label: t('directDebit.name'),
    align: 'left',
    field: (row) => row.receiver.fullName,
    sortable: true,
  },
  {
    name: 'dateCreated',
    align: 'center',
    label: t('directDebit.dateCreated'),
    field: (row) => new Date(row.dateCreated).toLocaleDateString(),
    sortable: true,
  },
]);

const rows = ref(null as null | []);

api
  .get('/api/directDebits/')
  .then((response) => {
    rows.value = response.data.content;
  })
  .catch((error) => {
    $q.notify({ message: t('directDebit.error'), color: 'negative' });
    rows.value = [];
  });

async function toggleDirectDebit(debit: Record<string, unknown>) {
  try {
    await api.put(`/api/directDebits/${debit.id}`, { active: debit.active });
    $q.notify({
      message: t(`directDebit.${debit.active ? 'activated' : 'deactivated'}`),
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
</script>
