import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Index from "../views/IndexView.vue";
import List from "../views/ListPage.vue";
import Seasonal from "../views/SeasonalView.vue";
import Recycle from "../views/RecycleView.vue";
import User from "../views/UserView.vue";
import TagList from "../views/TagListView.vue";
 
const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "home",
    component: Index,
    meta: { requiresAuth: true }
  },
  {
    path: "/",
    redirect:'/home',
  },
  {
    path: "/user",
    name:'user',
    component: User,
    
  },
  {
    path: "/list/coat/:tagid?",
    name:'coat',
    component: List,
    meta: { requiresAuth: true }
  },
  {
    path: "/list/pants",
    'name':'pants',
    component: List,
    meta: { requiresAuth: true }
  },
  {
    path: "/list/underwear",
    'name':'underwear',
    component: List,
    meta: { requiresAuth: true }
  },
  {
    path: "/list/shoe",
    'name':'shoe',
    component: List,
    meta: { requiresAuth: true }
  },
  {
    path: "/seasonal",
    name: "seasonal",
    component:Seasonal,
    meta: { requiresAuth: true }
  },
  {
    path: "/recycle",
    name: "recycle",
    component:Recycle,
    meta: { requiresAuth: true }
  },
  {
    path: "/taglist",
    'name':'taglist',
    component: TagList
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn =localStorage.getItem("userid") /* 判断用户是否已登录的逻辑，例如从localStorage中获取token */
  console.log(to.meta.requiresAuth);

  if (to.meta.requiresAuth&&!isLoggedIn) {
    next('/user') // 如果需要登录但用户未登录，则跳转到登录页面
  } else {
    next() // 否则继续导航
  }
})

export default router;
