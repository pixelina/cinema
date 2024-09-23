<template>
  <section class="moviePage"
    :style="movie ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` } : { backgroundImage: 'none' }">
    <div class="moviePage__content">
      <h2 class="moviePage__title">{{ movie.title }}</h2>
      <p class="moviePage__rating">{{ movie.vote_average }}</p>
      <div class="moviePage__buttons">
        <MyButton @click="openModal">More Details</MyButton>
        <MyButton @click="toMainPage">To Catalog</MyButton>
      </div>
    </div>
    <MovieModal v-model:seeModalState="isOpen" @after-click-close="closeModal"/>
  </section>
</template>

<script setup>
import MyButton from '@/components/UI/MyButton'
import MovieModal from '@/components/elements/MovieModal'
import router from '@/router/router';
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store/movieStore';
import { ref } from 'vue';

const isOpen = ref(false)

const openModal = () => {
    isOpen.value = true;
}
const closeModal = (emitValue) => {
    isOpen.value = emitValue;
}

const toMainPage = () => {
    router.push('/')
}

const movieStore = useMovieStore()

const route = useRoute()

const movie = ref({})

const loadMoviePage = async () => {
  movie.value = await movieStore.fetchMovie(route.params.id)
}

loadMoviePage()
</script>

<style lang="scss" scoped>
.moviePage {
  width: 100%;
  flex: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__content {
    display: flex;
    flex-flow: column;
    align-items: center;
    z-index: 1;
  }

  &__title {
    color: $white;
    font-size: 60px;
    margin-bottom: 30px;
  }

  &__rating {
    color: $grade-color;
    font-weight: 600;
    margin-bottom: 10px;
  }

  &__buttons {
    display: flex;
    flex-flow: row;
    gap: 15px;
  }

}
</style>