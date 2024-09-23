<template>
    <section class="signUpPage">
        <MyContainer class="signUpPage__container">
            <form class="signUpPage__form">
                <h3 class="signUpPage__heading">Sign Up</h3>
                <MyInput class="signUpPage__input" :myPlaceholder="'Your name...'" v-model:value="userInfo.name"
                    @input="checkName" :isValid="tests.name"
                    :message="`The name must consist of more than one letter`" />

                <MyInput class="signUpPage__input" :myPlaceholder="'Your email...'" v-model:value="userInfo.email"
                    @input="checkEmail" :isValid="tests.email"
                    :message="`Email must end with @gmail.com, @ukr.net, etc.`" />

                <MyInput class="signUpPage__input" :myType="'password'" :myPlaceholder="'Your password...'"
                    v-model:value="userInfo.password" @input="checkPassword" :isValid="tests.password"
                    :message="`The password must consist of at least 8 letters`" />

                <MyInput class="signUpPage__input" :myType="'password'" :myPlaceholder="'Password confirm...'"
                    v-model:value="userInfo.passwordConfirm" />
                <p class="signUpPage__redirect">Already have an account? <router-link to="/sign-in"
                        class="signUpPage__link">Sign in!</router-link></p>
                <MyButton class="signUpPage__button" @click="signUp">Sign Up</MyButton>
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
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
})

const regExps = ref({
    name: /^[A-Za-z]{2,20}$/,
    email: /^[A-Za-z]\w+[@][A-Za-z]{2,}[.][A-Za-z]{2,}$/,
    password: /^[A-Za-z]{8,20}$/
})

const tests = ref({
    name: true,
    email: true,
    password: true
})

const signUp = async () => {
    tests.value.name = regExps.value.name.test(userInfo.value.name);
    tests.value.email = regExps.value.email.test(userInfo.value.email);
    tests.value.password = regExps.value.password.test(userInfo.value.password);
    if (tests.value.name && tests.value.email && tests.value.password && (userInfo.value.name !== '' && userInfo.value.email !== '' && userInfo.value.password !== '')) {
        let copyUserInfo = { ...userInfo.value };
        delete copyUserInfo.passwordConfirm;
        userStore.signOut();
        await userStore.signUp(copyUserInfo);
        await userStore.signInAuto();
        userInfo.value.name = '';
        userInfo.value.email = '';
        userInfo.value.password = '';
        userInfo.value.passwordConfirm = '';
        if (userStore.currentUser) {
            router.push('/');
        }
    }
}

const checkName = (valueFromInput) => {
    tests.value.name = regExps.value.name.test(valueFromInput);
}

const checkEmail = (valueFromInput) => {
    tests.value.email = regExps.value.email.test(valueFromInput);
}

const checkPassword = (valueFromInput) => {
    tests.value.password = regExps.value.password.test(valueFromInput);
}
</script>

<style lang="scss" scoped>
.signUpPage {
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