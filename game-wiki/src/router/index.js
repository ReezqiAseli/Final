import { createWebHistory, createRouter } from "vue-router"

import HomePage from "@/components/HomePage.vue"
import CharactersPage from "@/components/CharactersPage.vue"
import ControlsPage from "@/components/ControlsPage.vue"

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
    {
        path: "/Controls",
        name: "Controls",
        component: ControlsPage
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router