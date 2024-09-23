import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import SignInPage from '@/pages/SignInPage.vue'
import MoviePage from '@/pages/MoviePage.vue'
import { useUserStore } from '@/store/userStore';


const routes = [
  {
    path: '/',
    component: MainPage,
    meta: { auth: true }
  },
  {
    path: '/sign-up',
    component: SignUpPage
  },
  {
    path: '/sign-in',
    component: SignInPage
  },
  {
    path: '/movie/:id',
    component: MoviePage,
    meta: { auth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && (!userId || !token)) {
    next('/sign-in')
  } else {
    next()
  }
})

export default router
