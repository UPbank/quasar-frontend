<template>
  <div>
    <h3 class="q-mt-sm text-center">Transfers</h3>
    <q-card class="q-mb-md transfer-card">
      <h5 class="q-my-md text-center">Wire Transfers</h5>
      <q-item
        clickable
        v-ripple
        class="transfer-item"
        :to="'/national-transfer'"
      >
        <q-item-section avatar>
          <q-icon name="paid" size="md" />
        </q-item-section>

        <q-item-section>National transfer</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="transfer-item" disable>
        <q-tooltip>Coming soon</q-tooltip>
        <q-item-section avatar>
          <q-icon name="outbound" size="md" />
        </q-item-section>

        <q-item-section>International transfer</q-item-section>
      </q-item>
    </q-card>
    <q-card class="q-mb-md transfer-card">
      <h5 class="q-my-md text-center">Payments</h5>
      <q-item clickable v-ripple class="transfer-item">
        <q-item-section avatar>
          <q-icon name="payments" size="md" />
        </q-item-section>

        <q-item-section>Service payment</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="transfer-item">
        <q-item-section avatar>
          <q-icon name="account_balance" size="md" />
        </q-item-section>

        <q-item-section>Government payment</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="transfer-item">
        <q-item-section avatar>
          <q-icon name="smartphone" size="md" />
        </q-item-section>

        <q-item-section>Telco payment</q-item-section>
      </q-item>
    </q-card>

    <q-card class="q-mb-md transfer-card">
      <h5 class="q-my-md text-center">Manage</h5>
      <q-item clickable v-ripple class="transfer-item">
        <q-item-section avatar>
          <q-icon name="credit_score" size="md" />
        </q-item-section>

        <q-item-section>Direct debits</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="transfer-item">
        <q-item-section avatar>
          <q-icon name="autorenew" size="md" />
        </q-item-section>

        <q-item-section>Standing orders</q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.transfer-item {
  font-size: 1.3em;
  margin-bottom: 5px;
  padding: 15px 30px;
}

.transfer-card {
  padding: 15px 0px;
}
</style>
