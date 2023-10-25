import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Index from "../views/IndexView.vue";
import List from "../views/ListPage.vue";
import Seasonal from "../views/SeasonalView.vue";
import Recycle from "../views/RecycleView.vue";
 
const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "home",
    component: Index,
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/list/coat",
    name:'coat',
    component: List,
  },
  {
    path: "/list/pants",
    'name':'pants',
    component: List,
  },
  {
    path: "/list/underwear",
    'name':'underwear',
    component: List,
  },
  {
    path: "/list/shoe",
    'name':'shoe',
    component: List,
  },
  {
    path: "/seasonal",
    name: "seasonal",
    component:Seasonal,
  },
  {
    path: "/recycle",
    name: "recycle",
    component:Recycle,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
