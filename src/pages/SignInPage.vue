<template>
    <section class="signInPage">
        <MyContainer class="signInPage__container">
            <form class="signInPage__form">
                <h3 class="signInPage__heading">Sign In</h3>
                <MyInput class="signInPage__input" :myPlaceholder="'Your email...'" v-model:value="userInfo.email"
                    @input="checkEmail" :isValid="tests.email"
                    :message="`Email must end with @gmail.com, @ukr.net, etc.`" />

                <MyInput class="signInPage__input" :myType="'password'" :myPlaceholder="'Your password...'"
                    v-model:value="userInfo.password" @input="checkPassword" :isValid="tests.password"
                    :message="`The password must consist of at least 8 letters`" />
                <p class="signInPage__redirect">Don't have an account? <router-link to="/sign-up"
                        class="signInPage__link">Sign up!</router-link></p>
                <MyButton class="signInPage__button" @click="signIn">Sign In</MyButton>
            </form>
        </MyContainer>
    </section>
</template>

<script setup>
import MyContainer from '@/components/UI/MyContainer'
import MyInput from '@/components/UI/MyInput'
import MyButton from '@/components/UI/MyButton'
import { ref } from 'vue'
import router from '@/router/router';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore()

const userInfo = ref({
    email: '',
    password: ''
})

const regExps = ref({
    email: /^[A-Za-z]\w+[@][A-Za-z]{2,}[.][A-Za-z]{2,}$/,
    password: /^[A-Za-z]{8,20}$/
})

const tests = ref({
    email: true,
    password: true
})

const signIn = async () => {
    tests.value.email = regExps.value.email.test(userInfo.value.email);
    tests.value.password = regExps.value.password.test(userInfo.value.password);
    if (tests.value.email && tests.value.password && (userInfo.value.email !== '' && userInfo.value.password !== '')) {
        userStore.signOut();
        await userStore.signIn(userInfo.value);
        userInfo.value.email = '';
        userInfo.value.password = '';
        if (userStore.currentUser) {
            router.push('/');
        }
    }
}

const checkEmail = (valueFromInput) => {
    tests.value.email = regExps.value.email.test(valueFromInput);
}

const checkPassword = (valueFromInput) => {
    tests.value.password = regExps.value.password.test(valueFromInput);
}

</script>

<style lang="scss" scoped>
.signInPage {
    background: $main-bg-color;

    &__container {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    &__form {
        display: flex;
        flex-flow: column;
        align-items: center;
        gap: 25px;
    }

    &__heading {
        font-family: 'Josefin Sans', sans-serif;
        font-size: 18px;
        color: black;
    }

    &__redirect {
        font-family: 'Josefin Sans', sans-serif;
        font-size: 16px;
        color: black;
    }

    &__link {
        font-family: 'Josefin Sans', sans-serif;
        font-size: 16px;
        color: #e8554b;
        text-decoration: underline;
        display: inline;
    }
}
</style>