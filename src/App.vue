<template>
  <div class="app">
    <header class="app__header">
      <MyHeader></MyHeader>
    </header>

    <main class="app__main">
      <RouterView></RouterView>
    </main>

    <footer class="app__footer">
      <MyFooter></MyFooter>
    </footer>
    <MyNotification />
  </div>
</template>

<script setup>
import MyHeader from '@/components/elements/MyHeader'
import MyFooter from '@/components/elements/MyFooter'
import MyNotification from '@/components/UI/MyNotification'
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore()

//autorun
userStore.signInAuto();
</script>

<style lang="scss">
@import '@/assets/scss/base/_modern-normalize';
@import '@/assets/scss/base/_default-settings';

.app {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: $main-bg-color;

  &__main {
    display: flex;
    justify-content: center;
    flex-grow: 3;
  }
}
</style>