<template>
  <section class="mainPage">
    <MyContainer class="mainPage__container">
      <MyInput class="mainPage__input" :myPlaceholder="'Search movie...'" @input="findMovie" v-model:value="search" />
      <FilmsList v-if="search.length > 0" :title="'Your result'" :movieSet="finded" />
      <div v-else class="mainPage__lists">
        <FilmsList :title="'Popular'" :movieSet="populars.slice(0, 10)" />
        <FilmsList :title="'Cartoons'" :movieSet="cartoons.slice(0, 10)" />
      </div>
    </MyContainer>
  </section>
</template>

<script setup>
import MyContainer from '@/components/UI/MyContainer'
import MyInput from '@/components/UI/MyInput'
import FilmsList from '@/components/elements/FilmsList'
import { useMovieStore } from '@/store/movieStore';
import { ref } from 'vue';

const search = ref('')

const finded = ref([])

const populars = ref([])

const cartoons = ref([])

const movieStore = useMovieStore()

const run = async () => {
  populars.value = await movieStore.getPopulars();
  cartoons.value = await movieStore.getCartoons();
}


const findMovie = async (valueFromInput) => {
  if (valueFromInput.length > 0) {
    finded.value = await movieStore.findMovie(valueFromInput);
  }
}

//autorun
run();
</script>

<style lang="scss" scoped>
.mainPage {
  background: $main-bg-color;

  &__container {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  &__input {
    width: 100%;
    margin: auto;
    margin-bottom: 25px;
  }

  &__lists {
    display: flex;
    flex-flow: column;
    gap: 25px;
  }

  @media screen and (min-width: 480px) {
    &__input {
      width: calc((100% - 15px) / 2);
    }
  }

  @media screen and (min-width: 768px) {
    &__input {
      width: calc((100% - 45px) / 3);
    }
  }

  @media screen and (min-width: 1200px) {
    &__input {
      width: calc((100% - 60px) / 5);
    }
  }
}
</style>