<template>
    <router-link to="/" class="myLogo">
        Cinéma
    </router-link>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.myLogo {
    color: $accent-color;
    font-weight: bold;
    font-family: "Josefin Sans", sans-serif;
    font-size: 28px;
    text-shadow: 2px 2px 0 rgb(66, 45, 15);
    transition-property: scale;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        scale: 1.1;
    }
}
</style>