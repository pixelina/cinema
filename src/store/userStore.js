import axios from "axios"
import { defineStore } from "pinia"
import router from '@/router/router';
import { useNotificationStore } from '@/store/notificationStore';
import { ref } from "vue"

export const useUserStore = defineStore('userStore', () => {
    const currentUser = ref('')
    const notificationStore = useNotificationStore()

    const signUp = async (user) => {
        try {
            const response = await axios.post('http://localhost:3000/register', user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', response.data.user.id);
            notificationStore.showNotification(response.status, response.statusText);
        } catch (error) {
            notificationStore.showNotification(error.response.status, error.response.statusText);
        }
    }

    const signIn = async (user) => {
        try {
            const response = await axios.post('http://localhost:3000/login', user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
            currentUser.value = response.data.user;
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', response.data.user.id);
            console.log('RESPONSE: (Sign In)', response);
            notificationStore.showNotification(response.status, response.statusText);
        } catch (error) {
            notificationStore.showNotification(error.response.status, error.response.statusText);
        }
    }

    const signInAuto = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${localStorage.getItem('userId')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            currentUser.value = response.data;
        } catch (error) {
            localStorage.setItem('token', '');
            localStorage.setItem('userId', '');
            router.push('/sign-in');
        }
    }

    const signOut = () => {
        currentUser.value = '';
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
    }

    return { currentUser, signUp, signIn, signInAuto, signOut }
})