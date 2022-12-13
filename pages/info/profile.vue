<template>
  <div class="d-flex flex-column justify-center">
    <div class="mx-auto">
      <v-btn elevation="4" class="text-btn" color="info" size="x-large" prepend-icon="mdi-account-school"
        append-icon="mdi-account-school">
        {{ userInfo.userName }}
      </v-btn>
    </div>
    <div class="mx-auto mt-2 mb-3 text-info">
      <div class="text-caption d-flex flex-row align-center">
        <div class="mr-1">
          <v-icon icon="mdi-alpha-m-box" class="mr-1" />
          <span class=" text-subtitle-2">{{ userInfo.term }}</span>
        </div>
        <div class="ml-1">
          <v-icon icon="mdi-link-box-variant" class=" mr-1" />
          <span class=" text-subtitle-2">id:#{{ userInfo.userID }}</span>
        </div>
      </div>
    </div>
    <div class="my-auto">
      <div class="d-flex flex-row align-start px-10 justify-center">
        <div class="w-66">
          <v-sheet min-width="400px" min-height="350px" class="pa-3" rounded="lg" elevation="6">
            <v-table>
              <tbody>
                <tr>
                  <td class=" head-tab text-no-wrap">身份:</td>
                  <td class=" sub-tab">
                    {{ userIdentity[userInfo.priority] }}
                  </td>
                </tr>
                <tr v-if="userInfo.priority === 0">
                  <td class="head-tab text-no-wrap">所在小组:</td>
                  <td class=" sub-tab">
                    <v-btn variant="text" color="warning" class="text-btn px-1">
                      <NuxtLink v-if="userInfo.groupID !== 0" :to="`/info/group?id=${userInfo.groupID}`"
                        class="text-info text-decoration-none">
                        <v-icon icon="mdi-account-group" class="mr-2" />{{ userInfo.groupName }}
                      </NuxtLink>
                      {{ showNotGrouped[userInfo.groupID !== -1] }}
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td class="head-tab text-no-wrap">兴趣方向:</td>
                  <td class=" sub-tab">
                    <v-chip-group column class="py-2 text-success">
                      <v-chip density="comfortable" v-for="interest in userInfo.interests" :key="interest"
                        variant="outlined">
                        {{ interest }}
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>
                <tr>
                  <td class="head-tab text-no-wrap pt-2">个人介绍:</td>
                  <td>
                    <v-responsive aspect-ratio="4 / 3" class="border mt-3 pa-2">
                      {{ userInfo.introduction }}
                    </v-responsive>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <div class="d-flex flex-row mt-10 mb-4 mx-3">
              <v-btn color="info" rounded="lg" class="text-btn">
                <v-icon icon="mdi-qqchat"></v-icon>
                <v-tooltip activator="parent" location="top">{{ userInfo.qqAccount }}</v-tooltip>
              </v-btn>
              <v-spacer />
              <v-btn color="info" append-icon="mdi-arrow-right-drop-circle-outline" rounded="lg"
                v-if="userInfo.userID == user.userID">
                <NuxtLink :to="`/info/profiled?id=${userInfo.userID}`" class="text-white text-decoration-none">
                  编辑信息
                </NuxtLink>
              </v-btn>
            </div>
          </v-sheet>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-btn {
  cursor: default;
  text-transform: none;
}

.per-row {
  gap: 5%
}

.head-tab {
  font-size: 1rem !important;
  font-weight: 600;
}

.sub-tab {
  font-size: 1rem !important;
  font-weight: normal;
}
</style>
<script setup>
import { store } from "~/store/store"

definePageMeta({
  layout: "introduct",
  middleware: ["auth"]
});

const route = useRoute();
const user = {
  userID: store().userID
}

// TODO: 
// 根据Token访问数据库获取(userID通过userID)
const userInfo = reactive({
  userID: route.query.id,
  userName: "Aurora",
  priority: 0,
  term: "2022秋",
  groupName: "Bug生产小组",
  groupID: 1001,
  interests: ["web开发", "前端", "图像处理", "人机交互"],
  introduction: "作为一名经管与计算机应用专业的学生，我认识到互联网将在未来经济中发挥巨大的作用，所以，业余时间我刻苦自学了很多网络知识。而且，我还不满足于此，进一步学习了Html语言，和Frontpage，Dreamweaver，等网页编辑软件，Firework，flash等网页图形处理软件，可以自如的进行网页编辑。",
  qqAccount: 573924561,
})

const showNotGrouped = { false: '尚未组队', true: '' };
const userIdentity = ["学生", "助教", "教师"];

</script>