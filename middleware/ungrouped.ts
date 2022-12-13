import { store } from "~/store/store"

const groupID = store().groupID;
const priority = store().priority;

// 检查当前用户没有组队，才能进入小组创建（组队功能）
export default defineNuxtRouteMiddleware((to, from) => {
  if (groupID !== -1 && priority <= 0) {
    return abortNavigation()
  }
})
