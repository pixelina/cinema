import { defineStore } from "pinia"
import { ref } from "vue"

export const useNotificationStore = defineStore('notificationStore', () => {
  const notification = ref({
    isShown: false,
    status: 0,
    statusText: ''
  })

  const showNotification = (status, statusText) => {
    notification.value.isShown = true;
    notification.value.status = status;
    notification.value.statusText = statusText;
    setTimeout(() => {
      notification.value.isShown = false;
      notification.value.status = 0;
      notification.value.statusText = '';
    }, 3000)
  }

  return { notification, showNotification }
})