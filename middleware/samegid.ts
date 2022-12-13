import { store } from "~/store/store"

const groupID = store().groupID;
const priority = store().priority;

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.query.id != groupID.toString() && priority <= 0) {
    return abortNavigation()
  }
})
