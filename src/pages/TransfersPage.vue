<template>
  <div>
    <q-table
      :title="t('Scheduled Payments')"
      :rows="rows || []"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      hide-pagination
      :loading="rows == null"
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
                      @click="send"
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
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const $q = useQuasar();

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
    label: () => t('service'),
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

api
  .get('/api/standingOrders/')
  .then((response) => {
    rows.value = response.data.content;
  })
  .catch((error) => {
    $q.notify({ message: t('standingOrders.error'), color: 'negative' });
    rows.value = [];
  });

const rows = ref(null as null | []);

function send() {
  if (operator.value == null) return;
  if (amount.value == null) return;

  api
    .post('/api/transfers/bankTransfers/', {
      operator: operator.value,
      amount: amount.value,
      text: text.value,
      date: date.value,
    })
    .then(() => {
      $q.notify({
        message: 'Transfer sent successfuly',
        color: 'positive',
      });
    })
    .catch((error) => {
      if (error.response) {
        return $q.notify({
          message: error.response.data.exception,
          color: 'negative',
        });
      }
      $q.notify({ message: t('badRequest.error'), color: 'negative' });
    });
}
</script>
