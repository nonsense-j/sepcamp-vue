import { store } from "~/store/store"

const userID = store().userID;
const priority = store().priority;

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.query.id != userID.toString() && priority <= 0) {
    return abortNavigation()
  }
})