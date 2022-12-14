<template>
  <q-layout view="hHh lpR fFf">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      appear
      :duration="300"
    >
      <q-header class="bg-dark" v-if="previous">
        <q-toolbar>
          <q-btn flat dense round icon="arrow_back" @click="$router.back()" />
          <q-toolbar-title>
            <span class="q-ml-sm">{{ name }}</span>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
    </transition>
    <q-page-container
      class="column items-center full-width"
      id="page-container"
    >
      <q-page
        padding
        class="column items-center"
        style="max-width: 1440px; padding-top: 50px"
      >
        <router-view />
      </q-page>
    </q-page-container>
    <q-footer class="bg-dark row justify-center" elevated>
      <q-tabs align="justify" style="max-width: 1000px; width: 100%">
        <q-route-tab icon="home" to="/home" :label="t('routes.home')" />
        <q-route-tab
          icon="swap_vert"
          to="/transfers"
          :label="t('routes.transfers')"
        />
        <q-route-tab
          icon="credit_card"
          to="/cards"
          :label="t('routes.cards')"
        />
        <q-route-tab icon="person" to="/account" :label="t('routes.account')" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useAccountStore } from 'src/stores/account-store';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const accounts = useAccountStore();
const $route = useRoute();

const { t } = useI18n();

const name = computed(() => $route.meta.name);
const previous = computed(() => $route.meta.previous);

accounts.initialize().catch(() => {
  $q.notify({
    message: 'error.unknown',
    type: 'negative',
  });
  window.location.href = '/';
});
</script>

<style lang="scss">
.body--dark {
  #page-container {
    background: linear-gradient(
        35deg,
        rgba($accent, 0.2) 1%,
        rgba(255, 255, 255, 0) 30%,
        $dark-page
      ),
      linear-gradient(
        to top,
        rgba($primary, 0.4) 1%,
        rgba(255, 255, 255, 0) 40%,
        $dark-page
      ),
      linear-gradient(
          -35deg,
          rgba($secondary, 0.2) 1%,
          rgba(255, 255, 255, 0) 30%,
          $dark-page
        )
        $dark-page;
  }
}

.body--light {
  #page-container {
    background: linear-gradient(
        35deg,
        rgba($accent, 0.2) 1%,
        rgba(255, 255, 255, 0) 40%,
        #fff
      ),
      linear-gradient(
        to top,
        rgba($primary, 0.4) 1%,
        rgba(255, 255, 255, 0) 80%,
        #fff
      ),
      linear-gradient(
          -35deg,
          rgba($secondary, 0.2) 1%,
          rgba(255, 255, 255, 0) 40%,
          #fff
        )
        #fff;
  }
}

.body--light,
.body--dark {
  #page-container {
    background-size: 100% 200%;
    animation: gradient 2s ease-out;
    background-position: 0% 75%;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 75%;
  }
}
</style>
