<template>
    <div class="myNotification" v-if="notificationStore.notification.isShown">
        <div v-if="notificationStore.notification.status >= 200 && notificationStore.notification.status < 299" class="myNotification__status--green">
            <svg class="myNotification__svg" width="24" height="20">
                <use href="@/assets/images/symbol-defs.svg#icon-ok"></use>
            </svg>
        </div>
        <div v-else class="myNotification__status--red">
            <svg class="myNotification__svg" width="24" height="20">
                <use href="@/assets/images/symbol-defs.svg#icon-error"></use>
            </svg>
        </div>
        <div class="myNotification__info">
            <h5 class="myNotification__title">Status: {{ notificationStore.notification.status }}</h5>
            <p class="myNotification__description">{{ notificationStore.notification.statusText }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNotificationStore } from '@/store/notificationStore';

const notificationStore = useNotificationStore()
</script>

<style lang="scss" scoped>
.myNotification {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1000;
    display: flex;
    flex-flow: row;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;

    &__status--green {
        background-color: green;
        width: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__status--red {
        background-color: darkred;
        width: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__svg {
        fill: white;
    }

    &__info {
        width: 170px;
        height: 60px;
        padding: 10px;
    }

    &__title {
        font-size: large;
        margin-bottom: 5px;
    }

    &__description {
        font-size: medium;
    }
}
</style>