import { createWebHistory, createRouter } from "vue-router"

import HomePage from "@/components/HomePage.vue"
import CharactersPage from "@/components/CharactersPage.vue"

const routes = [
    {
      path: "/",
      redirect: "/Home"
    },
    {
        path: "/Home",
        name: "Home",
        component: HomePage
    },
    {
        path: "/Characters",   
        name: "Characters",
        component: CharactersPage
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router