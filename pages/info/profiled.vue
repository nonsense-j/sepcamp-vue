<template>
  <div class="d-flex flex-column justify-center">
    <div class="mx-auto">
      <v-btn elevation="4" class="text-btn" color="info" size="x-large" prepend-icon="mdi-account-group"
        append-icon="mdi-account-group">
        个人信息编辑
      </v-btn>
    </div>
    <div class="mx-auto mt-2 mb-3 text-info">
      <div class="text-caption d-flex flex-row align-center">
        <div class="ml-1">
          <v-icon icon="mdi-link-box-variant" class=" mr-1" />
          <span class=" text-subtitle-2">id:#{{ user.userID }}</span>
        </div>
      </div>
    </div>
    <div class="my-auto">
      <div class="d-flex flex-row align-start px-10 justify-center">
        <div class="w-66">
          <v-form v-model="valid" lazy-validation>
            <v-sheet min-width="400px" min-height="350px" class="pa-3" rounded="lg" elevation="6">
              <v-container>
                <div class="d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">学期:</div>
                  <div class="sub-tab flex-fill">
                    <v-select variant="outlined" v-model="userInfo.term" :items="terms"
                      :rules="[v => !!v || '需要选择你所修读的学期']" placeholder="学期" density="compact" required class="w-50">
                    </v-select>
                  </div>
                </div>
                <div class="d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">联系QQ:</div>
                  <div class="sub-tab flex-fill">
                    <v-text-field density="compact" v-model="userInfo.qqAccount" :rules="notNullRules"
                      variant="outlined" class="w-50" clearable>
                    </v-text-field>
                  </div>
                </div>
                <div class="pb-5 d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">兴趣方向:</div>
                  <div class="sub-tab flex-fill d-flex flex-column">
                    <v-responsive class="border py-1 px-2">
                      <v-chip-group column class="flex-fill text-success">
                        <v-chip v-for="interest in newInterests" :key="interest" density="comfortable"
                          variant="outlined" class="text-btn">
                          {{ interest }}
                        </v-chip>
                      </v-chip-group>
                      <div class=" d-flex flex-row">
                        <v-text-field :messages="(nullInterest && !newInterest) ? '请先输入兴趣方向' : '可以点击右侧按钮添加标签'"
                          v-model="newInterest" density="compact" variant="outlined">
                        </v-text-field>
                        <v-btn icon="mdi-plus" density="compact" color="info" class="mt-1 ml-2"
                          @click="addInterest()"></v-btn>
                        <v-btn icon="mdi-minus" density="compact" color="info" class="mt-1 ml-1"
                          @click="newInterests.pop()"></v-btn>
                      </div>
                    </v-responsive>
                  </div>
                </div>
                <div class="d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">个人介绍:</div>
                  <div class="sub-tab flex-fill">
                    <v-textarea density="compact" v-model="userInfo.introduction" :rules="notNullRules"
                      variant="outlined">
                    </v-textarea>
                  </div>
                </div>
              </v-container>
              <div class="d-flex flex-row mb-4 mb-3">
                <v-btn color="info" append-icon="mdi-close-circle-outline" rounded="lg" @click="backPage">
                  取消编辑
                </v-btn>
                <v-spacer />
                <!-- TODO: -->
                <!-- 点击提交信息回到小组信息页并且刷新 -->
                <NuxtLink :to="`/info/profile?id=${$route.query.id}`" class=" text-decoration-none">
                  <v-btn color="info" append-icon="mdi-arrow-right-drop-circle-outline" rounded="lg">
                    提交信息
                  </v-btn>
                </NuxtLink>
              </div>
            </v-sheet>
          </v-form>
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
  vertical-align: text-top;
  min-width: 100px;
}

.sub-tab {
  font-size: 0.875rem !important;
  font-weight: normal;
}
</style>
<script setup>
import { store } from "~/store/store"
import axios from "axios";

definePageMeta({
  layout: "introduct",
});

const user = {
  userName: store().username,
  priority: store().priority,
  userID: store().userID,
  groupID: store().groupID,
}

// TODO: 
// 根据Token访问数据库获取 也是form数据
const userInfo = reactive({
  userID: user.userID,
  term: "2022秋",
  interests: ["web开发", "前端", "图像处理", "人机交互"],
  introduction: "作为一名经管与计算机应用专业的学生，所以，业余时间我刻苦自学了很多网络知识。而且，我还不满足于此，进一步学习了Html语言，和Frontpage，Dreamweaver，等网页编辑软件，Firework，flash等网页图形处理软件，可以自如的进行网页编辑。",
  qqAccount: 573924561,
})
let global_store = store()
axios.defaults.headers['authorization'] = global_store.token;
axios.post(global_store.serverURL + "userinfo/getUserInformation", {user_id: global_store.userID})
    .then(response => {
      let data = response.data
      userInfo.introduction = data.Introduction
      axios.post(global_store.serverURL + "team/getTeamById", {team_id: data.team_id})
          .then(response => {
            let data2= response.data
            userInfo.groupName = data2.team_name
          })
    })

const valid = ref(true);
const router = useRouter();
const notNullRules = reactive([v => !!v || '内容不能为空']);
const terms = reactive(store().terms);

let newInterests = reactive(userInfo.interests);
const newInterest = ref("");
let nullInterest = ref(false);
const addInterest = () => {
  if (newInterest.value) {
    newInterests.push(newInterest.value);
    newInterest.value = "";
    nullInterest.value = false;
  }
  else
    nullInterest.value = true;
}

const backPage = () => {
  router.go(-1);
}

</script>