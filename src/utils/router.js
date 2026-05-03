import { createRouter, createMemoryHistory } from "vue-router";

import introduction from "../pages/introduction.vue";
import toDoList from "../pages/toDoList.vue";
import money from "../pages/money.vue";

const routes = [
  { path: "/", component: introduction },
  { path: "/money", component: money },
  { path: "/toDoList", component: toDoList },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
export { router };
