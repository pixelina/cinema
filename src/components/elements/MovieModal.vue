<template>
  <section :class="modalState === true ? 'movieModal movieModal--open' : 'movieModal'">
    <MyContainer class="movieModal__container">
      <div class="movieModal__image">
        <img class="movieModal__poster" :src="movie.poster_path
          ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          : null
          " />
        <MyButton class="movieModal__button" @click="closeModal">Close</MyButton>
      </div>
      <div class="movieModal__content">
        <h2 class="movieModal__title">{{ movie.title }}</h2>
        <p class="movieModal__description">{{ movie.overview }}</p>

        <p class="movieModal__text">
          <span class="movieModal__subtitle">Genres: </span><span :key="genre.id"
          v-for="(genre, index) in movie.genres">{{ genre.name }}{{ index < movie.genres.length - 1 ? ', ' : '.' }}</span>
        </p>

        <p class="movieModal__text">
          <span class="movieModal__subtitle">Companies: </span><span :key="company.id"
            v-for="(company, index) in movie.production_companies">{{ company.name }}{{ index < movie.production_companies.length - 1 ? ', ' : '.' }}</span>
        </p>

        <p class="movieModal__text">
          <span class="movieModal__subtitle">Budget: </span>{{ movie.budget }}$
        </p>
        <p class="movieModal__text">
          <span class="movieModal__subtitle">Release: </span>{{ movie.release_date }}
        </p>
        <p class="movieModal__text">
          <span class="movieModal__subtitle">Rating: </span>{{ movie.vote_average }}
        </p>
      </div>
    </MyContainer>
  </section>
</template>

<script setup>
import MyContainer from '@/components/UI/MyContainer'
import MyButton from '@/components/UI/MyButton'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store/movieStore';
import { ref } from 'vue';

const movieStore = useMovieStore()

const route = useRoute()

const movie = ref({})

const loadMoviePage = async () => {
  movie.value = await movieStore.fetchMovie(route.params.id)
  console.log(movie.value)
}

loadMoviePage()

const modalState = defineModel('seeModalState');

const closeModal = () => {
  modalState.value = false;
}
</script>

<style lang="scss" scoped>
.movieModal {
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: $main-bg-color;
  position: absolute;
  overflow-y: auto;
  transform: translateX(100%);

  transition-property: transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &--open {
    transform: translateX(0%);
  }

  &__container {
    height: 100%;
    display: flex;
    flex-flow: row;
    gap: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  &__image {
    flex: 1 1 0;
  }

  &__content {
    flex: 3 1 0;
  }

  &__poster {
    display: block;
    width: 90%;
    margin-bottom: 10px;
  }

  &__button {
    width: 90%;
  }

  &__title {
    text-align: center;
    margin: 0 auto 30px;
    font-size: 28px;
    text-shadow: 2px 2px 0 rgb(66, 45, 15);
    color: #e8554b;
  }

  &__subtitle {
    color: $accent-color;
    font-weight: bold;
    text-shadow: 1px 1px 0 rgb(66, 45, 15);
  }

  &__description {
    font-size: 16px;
    font-family: "Josefin Sans";
    margin-bottom: 15px;
  }

  &__text {
    font-size: 16px;
    font-family: "Josefin Sans";
    margin-bottom: 7px;
  }

  &__genres,
  &__companies {
    font-size: 16px;
    font-family: "Josefin Sans";
    display: flex;
    margin-bottom: 7px;
  }

}
</style>