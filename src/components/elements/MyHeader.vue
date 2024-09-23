<template>
    <header class="myHeader">
        <MyContainer class="myHeader__container">
            <nav class="myHeader__navigation">
                <MyLogo class="myHeader__logo"></MyLogo>
                <div class="myHeader__buttons">
                    <p class="myHeader__user">{{ userStore.currentUser ? userStore.currentUser.name : '' }}</p>
                    <MyButton v-if="userStore.currentUser" class="myHeader__button" @click="SignOut">Exit</MyButton>
                    <MyButton v-else class="myHeader__button" @click="toSignInPage">Sign In</MyButton>
                </div>
            </nav>
        </MyContainer>
    </header>
</template>

<script setup>
import MyContainer from '@/components/UI/MyContainer'
import MyButton from '@/components/UI/MyButton'
import MyLogo from '@/components/UI/MyLogo'
import router from '@/router/router';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore()

const toSignInPage = () => {
    router.push('/sign-in')
}

const SignOut = () => {
    userStore.signOut();
    router.push('/sign-in')
}
</script>

<style lang="scss" scoped>
.myHeader {
    color: $main-text-color;
    position: sticky;
    z-index: 1000;
    top: 0;
    width: 100%;
    background: $main-bg-color;

    &__container {
        padding-top: 30px;
        padding-bottom: 30px;
        position: relative;
        border-bottom: 2px solid $accent-color;
    }

    &__navigation {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
    }

    &__buttons {
        display: flex;
        flex-flow: row;
        gap: 20px;
        align-items: center;
    }

    &__user {
        font-size: 16px;
        font-weight: 600;
        color: $accent-color;

        &::first-letter {
            text-transform: uppercase;
        }
    }
}
</style>