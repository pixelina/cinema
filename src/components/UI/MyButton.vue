<template>
    <button class="myButton" type="button">
        <slot></slot>
    </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.myButton {
    cursor: pointer;
    background-color: $accent-color;
    color: $white;
    border: none;
    border-radius: 5px;
    height: 40px;
    padding: 0 20px;
    font-size: 16px;
    font-family: "Josefin Sans", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    transition-property: scale;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        scale: 1.1;
    }
}
</style>