<template>
  <div class="d-flex flex-column justify-center">
    <div class="mx-auto">
      <v-btn elevation="4" class="text-btn" color="primary" size="x-large" prepend-icon="mdi-account-group"
        append-icon="mdi-account-group">
        小组信息编辑
      </v-btn>
    </div>
    <div class="mx-auto mt-2 mb-3 text-primary">
      <div class="text-caption d-flex flex-row align-center">
        <div class="ml-1">
          <v-icon icon="mdi-link-box-variant" class=" mr-1" />
          <span class=" text-subtitle-2">id:#{{ group.groupID }}</span>
        </div>
      </div>
    </div>
    <div class="my-auto">
      <div class="d-flex flex-row align-start px-10 justify-center">
        <div class="w-66">
          <v-form v-model="valid" lazy-validation>
            <v-sheet min-width="400px" min-height="350px" class="pa-3" rounded="lg" elevation="6">
              <v-container>
                <div class="pt-3 d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">小组名:</div>
                  <div class="sub-tab flex-fill">
                    <v-text-field density="compact" v-model="group.groupName" :rules="notNullRules" variant="outlined"
                      clearable>
                    </v-text-field>
                  </div>
                </div>
                <div class="d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">学期:</div>
                  <div class="sub-tab flex-fill">
                    <v-select variant="outlined" v-model="group.term" :items="terms"
                      :rules="[v => !!v || '需要选择你所修读的学期']" placeholder="学期" density="compact" required class="w-50">
                    </v-select>
                  </div>
                </div>
                <div class="d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">项目名称:</div>
                  <div class="sub-tab flex-fill">
                    <v-text-field density="compact" v-model="group.ProjName" :rules="notNullRules" variant="outlined"
                      clearable>
                    </v-text-field>
                  </div>
                </div>
                <div class="d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">联系QQ:</div>
                  <div class="sub-tab flex-fill">
                    <v-text-field density="compact" v-model="group.qqAccount" :rules="notNullRules" variant="outlined"
                      clearable>
                    </v-text-field>
                  </div>
                </div>
                <div class="pb-5 d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">小组成员:</div>
                  <div class="sub-tab flex-fill d-flex flex-column">
                    <v-responsive class="border py-1 px-2">
                      <v-chip-group column class="flex-fill text-info ">
                        <v-chip rounded="lg" v-for="interest in newMemberIDs" :key="interest" density="comfortable"
                          variant="outlined" class="text-btn">
                          <v-icon icon="mdi-link-box-variant" class="mr-1" />#{{ interest }}
                        </v-chip>
                      </v-chip-group>
                      <div class=" d-flex flex-row">
                        <v-text-field
                          :messages="(nullMemberID && !newMemberID) ? '请先输入用户id(纯数字) --人数上限3人' : '点击右侧按钮输入id(纯数字)添加成员 -- 人数上限3人'"
                          v-model="newMemberID" density="compact" variant="outlined">
                        </v-text-field>
                        <v-btn icon="mdi-plus" density="compact" color="primary" class="mt-1 ml-2"
                          @click="addMemberID()"></v-btn>
                        <v-btn icon="mdi-minus" density="compact" color="primary" class="mt-1 ml-1"
                          @click="newMemberIDs.pop()"></v-btn>
                      </div>
                    </v-responsive>
                  </div>
                </div>
                <div class="pb-5 d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">小组兴趣方向:</div>
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
                        <v-btn icon="mdi-plus" density="compact" color="primary" class="mt-1 ml-2"
                          @click="addInterest()"></v-btn>
                        <v-btn icon="mdi-minus" density="compact" color="primary" class="mt-1 ml-1"
                          @click="newInterests.pop()"></v-btn>
                      </div>
                    </v-responsive>
                  </div>
                </div>
                <div class="d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">小组介绍:</div>
                  <div class="sub-tab flex-fill">
                    <v-textarea density="compact" v-model="group.introduction" :rules="notNullRules" variant="outlined">
                    </v-textarea>
                  </div>
                </div>
              </v-container>
              <div class="d-flex flex-row mb-4 mb-3">
                <v-btn color="primary" append-icon="mdi-close-circle-outline" rounded="lg" @click="backPage">
                  取消编辑
                </v-btn>
                <v-spacer />
                <!-- TODO: -->
                <!-- 点击提交信息回到小组信息页并且刷新 -->
                <NuxtLink :to="`/info/group?id=${$route.query.id}`" class=" text-decoration-none">
                  <v-btn color="primary"  append-icon="mdi-arrow-right-drop-circle-outline" rounded="lg" @click="submitMessage">
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
  middleware: ["auth", "samegid"]
});

const route = useRoute();

// TODO: 
// 根据Token访问数据库获取(ID可以通过Token获取或者store)
const group = reactive({
  groupID: route.query.id, //-1表示没有组队
  groupName: "Bug生产队",
  ProjName: "面向群聊的聊天机器人",
  term: "2022秋",
  members: [],
  memberIDs: [],
  interests: ["机器学习", "自然语言处理"],
  introduction: "小组面向开发人员的群聊场景,提供专门的提高开发与解决问题效率的机器人.小组面向开发人员的群聊场景,提供专门的提高开发与解决问题效率的机器人.",
  qqAccount: 123123453,
  projectId:0,
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
      newInterests = data.interests.split('\u0001')
      group.introduction = data.introduction
      group.qqAccount = data.qqnumber
      group.projectId = data.project_id
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



const valid = ref(true);
const router = useRouter();
const notNullRules = reactive([v => !!v || '内容不能为空']);
const terms = reactive(store().terms);

let newInterests = reactive(group.interests);
const newInterest = ref("");
let nullInterest = ref(false);
const newMemberIDs = reactive(group.memberIDs);
const newMemberID = ref("");
let nullMemberID = ref(false);
const addInterest = () => {
  if (newInterest.value) {
    newInterests.push(newInterest.value);
    newInterest.value = "";
    nullInterest.value = false;
  }
  else
    nullInterest.value = true;
}
const addMemberID = () => {
  // console.log(newMemberIDs.length);
  if (newMemberID.value && newMemberIDs.length < 3) {
    newMemberIDs.push(newMemberID.value);
    newMemberID.value = "";
    nullMemberID.value = false;
  }
  else
    nullMemberID.value = true;
}

const backPage = () => {
  router.go(-1);
}

const submitMessage = () => {

  group.members = ["Aurora", "Charlie"];
      group.memberIDs = [1001, 1002];

  axios.defaults.headers['authorization'] = global_store.token;
  axios.post(global_store.serverURL + "team/ChangeTeamInformation", {
    team_id: global_store.groupID,
    team_name:group.groupName,
    interests:newInterests.join("\u0001"),
    introduction:group.introduction,
    qQNumber:group.qqAccount,
    project_id:group.qqAccount.toString(),
  }).then(response => {

        if(response.status === 200) {
          let result = response.data
          if(result.success === true) {
            alert('小组信息修改成功')
          }
          else {
            alert(result.message)
          }
        } else {
          console.log(response)
        }
      })

  axios.post(global_store.serverURL + "project/changeName", {
    project_id: group.projectId,
    project_name:group.ProjName,
  }).then(response => {
    if(response.status === 200) {
      let result = response.data
      if(result.success === true) {
      }
      else {
        alert(result.message)
      }
    } else {
      console.log(response)
    }
  })
}


</script>