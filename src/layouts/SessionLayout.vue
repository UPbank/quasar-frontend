<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="column items-center full-width">
      <q-page
        class="column items-center justify-center full-width"
        id="page"
        style="height: fit-content; min-height: 100vh"
        padding
      >
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
#page {
  background: linear-gradient(-15deg, #fac05e, #328fba, #59cd90, #fac05e);
  background-size: 200% 200%;
  animation: gradient 30s infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 25% 25%;
  }
  50% {
    background-position: 90% 90%;
  }
  100% {
    background-position: 25% 25%;
  }
}
</style>
