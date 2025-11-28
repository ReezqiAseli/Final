import { createWebHistory, createRouter } from "vue-router"

import HomePage from "@/components/HomePage.vue"
import CharactersPage from "@/components/CharactersPage.vue"
import ControlsPage from "@/components/ControlsPage.vue"
import CountersPage from "@/components/CountersPage.vue"
import StorePage from "@/components/StorePage.vue"


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
    },
    {
      path: "/Counters",
      name: "Counters",
      component: CountersPage
    },
    {
      path: "/Store",
      name: "Store",
      component: StorePage
    }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router