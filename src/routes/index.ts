import { createWebHistory, createRouter, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../components/About.vue'),
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router