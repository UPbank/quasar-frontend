<template>
  <q-layout view="hHh lpR fFf">
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
        <q-route-tab icon="home" to="/home" label="Home" />
        <q-route-tab icon="swap_vert" to="/transfers" label="Transfers" />
        <q-route-tab icon="credit_card" to="/cards" label="Cards" />
        <q-route-tab icon="person" to="/account" label="Account" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

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
        rgba(255, 255, 255, 0) 20%,
        #fff
      ),
      linear-gradient(
        to top,
        rgba($primary, 0.4) 1%,
        rgba(255, 255, 255, 0) 40%,
        #fff
      ),
      linear-gradient(
          -35deg,
          rgba($secondary, 0.2) 1%,
          rgba(255, 255, 255, 0) 20%,
          #fff
        )
        #fff;
  }
}
</style>
