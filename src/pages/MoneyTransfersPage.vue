<template>
  <div class="q-pa-xl"></div>
  <q-card class="text-caption" size="dense">
    <q-card-section padding class="column items-center">
      <div>Transfer Data</div>
      <div class="q-pa-md">
        <div>IBAN</div>
        <div>
          <q-input
            outlined
            v-model.number="IBAN"
            dense
            mask="AA ## ######## ########### ##"
            style="max-width: 400px"
            maxlength="25"
          />
        </div>
        <div>Amount</div>
        <q-input
          outlined
          v-model="amount"
          dense
          style="max-width: 400px"
          suffix="€"
          lazy-rules
        />
      </div>

      <div>
        <div>Note</div>
        <q-input
          outlined
          v-model.number="note"
          dense
          style="max-width: 400px"
        />
        <q-card-section>
          <q-btn round color="secondary" icon="upload_file" />
        </q-card-section>
      </div>
    </q-card-section>

    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="schedule"
          label="Choose Frequency"
        >
          <q-card>
            <q-card-section>
              <div class="q-pa-md">
                <div>Frequency</div>
                <div class="q-gutter-xl">
                  <q-select filled v-model="operator" :options="options" />
                </div>
              </div>
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
                              label="Close"
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
        </q-expansion-item>
      </q-list>
    </div>

    <q-card-section class="text-center">
      <q-btn unelevated rounded color="primary" label="Continue" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const IBAN = ref(null as null | number);
const amount = ref(null as null | number);
const note = ref(null as null | string);
const options = [null, 'Every Week', 'Every Month', 'Every Year'];
const operator = ref(null as null | number);
const date = ref('2019/02/01');
</script>
