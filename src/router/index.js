import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Update from "../views/Update.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/update/:storeIdToUpdate/:storeNameToUpdate/:storeAddressToUpdate/:storeEmailToUpdate/:storeContactNumberToUpdate/:storeOwnerToUpdate",
      name: "Update",
      component: Update,
      props: true,
    },
  ],
});

export default router;
