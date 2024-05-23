import { createRouter, createWebHistory } from 'vue-router';
import Favorito from '../components/Favorito.vue';
import Login from '../components/LoginIN.vue';
import Home from '../components/Home.vue';
import BookSearch from '../components/BookSearch.vue';
import Erro from '../components/Erro.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/favoritos', name: 'favorito', component: Favorito },
  { path: '/login', name: 'login', component: Login },
  { path: '/search', name: 'search', component: BookSearch },
  { path: '/:catchAll(.*)', name: 'erro', component: Erro }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;