<template>
    <div class="myContainer">
        <slot></slot>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.myContainer {
    width: 100%;
    margin: auto;
    padding: 0 15px;

    @media screen and (min-width: 480px) {
        width: 480px;
    }

    @media screen and (min-width: 768px) {
        width: 768px;
    }

    @media screen and (min-width: 1200px) {
        width: 1200px;
    }
}
</style>