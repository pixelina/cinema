<template>
    <div class="filmsList">
        <h2 class="filmsList__heading" v-if="title">{{ title }}</h2>
        <ul class="filmsList__list">
            <li class="filmsList__item" v-for="movie in movieSet">
                <router-link :to="'/movie/' + movie.id" class="filmsList__card"
                    :style="movie ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})` } : { backgroundImage: 'none' }">
                    <div class="filmsList__card-inner">
                        <h3 class="filmsList__card-name">{{ movie.title }}</h3>
                        <p class="filmsList__card-date">{{ movie.release_date }}</p>
                        <p class="filmsList__card-rating">{{ movie.vote_average }}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        required: true
    },
    movieSet: {
        required: true
    }
})

</script>

<style lang="scss" scoped>
.filmsList {

    &__list {
        display: flex;
        flex-flow: column;
        gap: 15px;
    }

    &__heading {
        font-family: 'Josefin Sans', sans-serif;
        font-size: 24px;
        color: black;
        margin-bottom: 15px;
    }

    &__card {
        width: 100%;
        background-color: $accent-color;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
            rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        border: 2px solid $accent-color;
        border-radius: 5px;
        height: 300px;
        cursor: pointer;
        transition-property: scale, color;
        transition-duration: 250ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
        color: $sub-text-color;
        position: relative;

        &:hover,
        &:focus {
            scale: 1.05;
        }
    }

    &__card-inner {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 10px;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), transparent);
        text-align: center;
    }

    @media screen and (min-width: 480px) {
        &__list {
            flex-flow: row wrap;
            gap: 15px;
        }

        &__item {
            width: calc((100% - 15px) / 2);
        }
    }

    @media screen and (min-width: 768px) {
        &__item {
            width: calc((100% - 30px) / 3);
        }
    }

    @media screen and (min-width: 1200px) {
        &__item {
            width: calc((100% - 60px) / 5);
        }
    }
}
</style>