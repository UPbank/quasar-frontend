import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import Account from 'src/types/Account';
import { ref } from 'vue';
import { AxiosResponse } from 'axios';

export const useAccountStore = defineStore({
  id: 'account',
  state: () => ({
    promise: Promise.resolve({}),
    active: ref(null as Account | null),
    initialized: false,
  }),
  getters: {},
  actions: {
    async getAccount() {
      const promise: Promise<AxiosResponse<Account[]>> = api.get('/accounts/');
      this.$state.promise = promise;
      const response = await promise;
      this.$state.active = response.data[0];
    },
    async initialize() {
      await this.getAccount();
      this.$state.initialized = true;
    },
  },
});
