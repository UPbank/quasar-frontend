<template>
  <div>
    <q-table
      :title="t('Scheduled Payments')"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <q-card style="min-height: 400px">
                <q-card-section style="width: 200px">
                  <div>{{ $t('Frequency') }}</div>
                  <q-select filled v-model="operator" :options="options" />
                  <div>
                    <div>{{ $t('Note') }}</div>
                    <q-input filled v-model="text"></q-input>
                  </div>
                  <div>{{ $t('Amount') }}</div>
                  <q-input filled v-model="amount" mask="##.##€"></q-input>

                  <div>
                    <div>{{ $t('Date') }}</div>
                  </div>

                  <q-input filled v-model="date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="date">
                            <div>
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
                  <q-card-section>
                    <q-btn
                      unelevated
                      rounded
                      color="primary"
                      :label="t('Continue')"
                    />

                    <q-btn
                      unelevated
                      rounded
                      color="negative"
                      :label="t('Delete')"
                    />
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const options = [null, 'Every Week', 'Every Month', 'Every Year'];
const operator = ref(null as null | number);
const amount = ref(null as null | number);
const text = ref('');
const date = ref('2019/02/01');
const initialPagination = {
  rowsPerPage: 0,
};
const columns = [
  {
    label: () => t('Change'),
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
    name: 'First Transfer',
    align: 'center',
    label: () => t('First Transfer'),
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
