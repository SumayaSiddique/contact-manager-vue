import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/createContact',
      name: 'createContact',
      component: () => import('../views/CreateContactView.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactListView.vue')
    },
    {
      path: '/contacts/edit/:id',
      name: 'editContact',
      component: () => import('../views/EditContactView.vue'),
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pagenotfound',
      component: () => import('../views/PageNotFoundView.vue')
    }
  ]
})

export default router
