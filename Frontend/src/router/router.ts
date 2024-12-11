import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import CreatePasswordVue from '@/views/CreatePassword.vue';
import PeopleData from '@/views/PeopleData.vue';
import CheckPassword from '@/views/PasswordCheck.vue';
import HomePage from '@/views/HomePage.vue';
import LearnMore from '@/views/LearnM.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home Page',
    component: HomePage,
  },
  {
    path: '/createpassword',
    name: 'Create password',
    component: CreatePasswordVue,
    props: { title: 'Password' },
  },
  {
    path: '/list',
    name: 'List',
    component: PeopleData,
    props: { title: 'List of People Data' },
  },
  {
    path: '/checkpassword',
    name: 'Check Password',
    component: CheckPassword,
  },
  {
    path: '/learn-more',
    name: 'LearnMore',
    component: LearnMore,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
