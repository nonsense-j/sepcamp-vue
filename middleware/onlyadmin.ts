import { store } from "~/store/store"

const priority = store().priority;

export default defineNuxtRouteMiddleware((to, from) => {
  if (priority !== 1 && priority !== 2) {
    return abortNavigation()
  }
})
