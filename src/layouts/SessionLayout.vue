<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container
      style="min-height: 100vh; height: 100vh; max-height: 100vh"
    >
      <q-page
        style="min-height: 100vh; height: 100vh; max-height: 100vh"
        class="column items-center justify-center q-gutter-y-xl"
        id="page"
      >
        <q-img src="logo-white-backdrop.svg" width="150px" />
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
#page {
  background: linear-gradient(-15deg, #fac05e, #328fba, #59cd90, #fac05e);
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
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
