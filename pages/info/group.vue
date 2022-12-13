<template>
  <div class="d-flex flex-column justify-center">
    <div class="mx-auto">
      <v-btn elevation="4" class="text-btn" color="primary" size="x-large" prepend-icon="mdi-account-group"
        append-icon="mdi-account-group">
        {{ group.groupName }}
      </v-btn>
    </div>
    <div class="mx-auto mt-2 mb-3 text-primary">
      <div class="text-caption d-flex flex-row align-center">
        <div class="mr-1">
          <v-icon icon="mdi-alpha-m-box" class="mr-1" />
          <span class=" text-subtitle-2">{{ group.term }}</span>
        </div>
        <div class="ml-1">
          <v-icon icon="mdi-link-box-variant" class=" mr-1" />
          <span class=" text-subtitle-2">id:#{{ group.groupID }}</span>
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
                  <td class="head-tab text-no-wrap">项目名称:</td>
                  <td class="sub-tab">{{ group.ProjName }}</td>
                </tr>
                <tr>
                  <td class="head-tab text-no-wrap">小组成员:</td>
                  <td class=" sub-tab">
                    <v-btn v-for="(p, i) in group.members" :key="i" variant="text" color="info" class="text-btn px-1">
                      <NuxtLink :to="`/info/profile?id=${group.memberIDs[i]}`" class="text-info text-decoration-none">
                        <v-icon icon="mdi-account-school" />{{ p }}
                      </NuxtLink>
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td class="head-tab text-no-wrap">小组兴趣方向:</td>
                  <td class=" sub-tab">
                    <v-chip-group column class="py-2 text-success">
                      <v-chip density="comfortable" v-for="interest in group.interests" :key="interest"
                        variant="outlined">
                        {{ interest }}
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>
                <tr>
                  <td class="head-tab text-no-wrap pt-2">小组介绍:</td>
                  <td>
                    <v-responsive aspect-ratio="4 / 3" class="border mt-3 pa-2">
                      {{ group.introduction }}
                    </v-responsive>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <div class="d-flex flex-row mt-10 mb-4 mx-3">
              <v-btn color="primary" rounded="lg" class="text-btn">
                <v-icon icon="mdi-qqchat"></v-icon>
                <v-tooltip activator="parent" location="top">{{ group.qqAccount }}</v-tooltip>
              </v-btn>
              <v-spacer />
              <!-- TODO: -->
              <!-- 点击退出小组进入创建小组页面 -->
              <v-btn color="warning" append-icon="mdi-arrow-right-drop-circle-outline" rounded="lg" @click="exitGroup()"
                class="mr-3">
                退出小组
              </v-btn>
              <v-btn color="primary" append-icon="mdi-arrow-right-drop-circle-outline" rounded="lg"
                v-if="user.groupID == group.groupID">
                <NuxtLink :to="`/info/grouped?id=${group.groupID}`" class="text-white text-decoration-none">
                  编辑小组
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
import axios from "axios";

definePageMeta({
  layout: "introduct",
  middleware: ["auth"]
});

const route = useRoute();

const user = {
  groupID: store().groupID,
}

// TODO: 
// 根据Token访问数据库获取(ID可以通过Token获取或者store)
const group = reactive({
  groupID: route.query.id, //-1表示没有组队
  groupName: "Bug生产队",
  ProjName: "面向群聊的聊天机器人",
  term: "2022秋",
  members: ["Aurora", "Charlie"],
  memberIDs: [1001, 1002],
  interests: ["机器学习", "自然语言处理"],
  introduction: "小组面向开发人员的群聊场景,提供专门的提高开发与解决问题效率的机器人.小组面向开发人员的群聊场景,提供专门的提高开发与解决问题效率的机器人.",
  qqAccount: 123123453,
});

let global_store = store()
axios.defaults.headers['authorization'] = global_store.token;
axios.post(global_store.serverURL + "team/getTeamById", {team_id: global_store.groupID})
    .then(response => {
      let data = response.data
      group.groupID = data.team_id
      group.groupName = data.team_name
      group.term = data.term
     group.interests = data.interests.split('\u0001')
     group.introduction = data.introduction
      group.qqAccount = data.qqnumber
      axios.post(global_store.serverURL + "project/getProject", {project_id: data.project_id})
          .then(response => {
            let data2= response.data
            group.ProjName = data2.project_name
          })

      axios.post(global_store.serverURL + "team/GetTeamMember", {team_id: global_store.groupID})
          .then(response => {
            let data3= response.data
            group.members = data3.names
            group.memberIDs = data3.ids
          })
    })

const router = useRouter();
const global_store = store();
const exitGroup = () => {
  if (confirm("是否确认退出当前小组？")) {
    // TODO
    // 访问后端 store().groupID=-1

    axios.post(global_store.serverURL + "team/DropOutOfLine", {user_id: global_store.userID})
        .then(response => {
        })

    global_store.setGroupID(-1);
    router.push("/");
  }
}

</script>