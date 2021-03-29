import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import exchange from '../views/Exchange.vue';

Vue.use(VueRouter);

const routes = [
  //   NBNB投资
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'NB',
      position: 'fixed',
      requireAuth: false,
      footer: true,
      hea: true,
    },
  },

  // 闪兑
  {
    path: '/exchange',
    name: 'exchange',
    component: exchange,
    meta: {
      title: 'NB',
      position: 'fixed',
      requireAuth: false,
      footer: true,
      hea: true,
    },
  },

  // 收益明细
  {
    path: '/profit',
    name: 'profit',
    component: (resolve) => require(['@/views/Profit'], resolve),
    meta: {
      title: 'NB',
      position: 'fixed',
      requireAuth: false,
      footer: true,
      hea: true,
    },
  },

  // 团队管理
  {
    path: '/team',
    name: 'team',
    component: (resolve) => require(['@/views/Team'], resolve),
    meta: {
      title: 'NB',
      position: 'fixed',
      requireAuth: false,
      footer: true,
      hea: true,
    },
  },

  //邀请好友
  {
    path: '/invite',
    name: 'invite',
    component: (resolve) => require(['@/views/Invite'], resolve),
    meta: {
      title: 'NB',
      position: 'fixed',
      requireAuth: false,
      footer: true,
      hea: true,
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
