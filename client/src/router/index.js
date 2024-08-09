import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Content from "../views/Content.vue";
import DataList from "../views/DataList.vue";
import DataForm from "../views/DataForm.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/content",
    component: Content,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/datalist",
    component: DataList,
    meta: { requiresAuth: true },
  },
  {
    path: "/dataform",
    component: DataForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});




export default router;
