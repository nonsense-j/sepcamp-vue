<template>
  <div class="d-flex flex-column justify-center">
    <div class="mx-auto">
      <v-btn elevation="4" class="text-btn" color="primary" size="x-large" prepend-icon="mdi-account-group"
        append-icon="mdi-account-group">
        小队信息编辑
      </v-btn>
    </div>
    <div class="mx-auto mt-2 mb-3 text-primary">
      <div class="text-caption d-flex flex-row align-center">
        <div class="ml-1">
          <v-icon icon="mdi-link-box-variant" class=" mr-1" />
          <span class=" text-subtitle-2">id:{{ group.groupID }}</span>
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
                <div class="pt-2 d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">学期:</div>
                  <div class="sub-tab flex-fill">
                    <v-select variant="outlined" v-model="group.term" :items="terms"
                      :rules="[v => !!v || '需要选择你所修读的学期']" placeholder="学期" density="compact" required class="w-75">
                    </v-select>
                  </div>
                </div>
                <div class="pt-3 d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">项目名称:</div>
                  <div class="sub-tab flex-fill">
                    <v-text-field density="compact" v-model="group.ProjName" :rules="notNullRules" variant="outlined"
                      clearable>
                    </v-text-field>
                  </div>
                </div>
                <div class="pt-3 d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">小队成员:</div>
                  <div class="sub-tab flex-fill">
                    <v-text-field density="compact" v-model="group.memberIDs[1]" :rules="notNullRules"
                      variant="outlined" clearable>
                    </v-text-field>
                  </div>
                </div>
                <div class="pt-3 d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">小队兴趣方向:</div>
                  <div class="sub-tab flex-fill">
                    <v-text-field density="compact" v-model="group.interests[1]" :rules="notNullRules"
                      variant="outlined" clearable>
                    </v-text-field>
                  </div>
                </div>
                <div class="pt-3 d-flex flex-row align-start">
                  <div class="head-tab text-no-wrap mt-2 mr-4">小队介绍:</div>
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
                <v-btn color="primary" append-icon="mdi-arrow-right-drop-circle-outline" rounded="lg">
                  提交信息
                </v-btn>
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
  min-width: 60px;
}

.sub-tab {
  font-size: 0.875rem !important;
  font-weight: normal;
}
</style>
<script setup>
import { store } from "~/store/store"

definePageMeta({
  layout: "introduct",
});

const user = {
  userName: store().username,
  priority: store().priority,
  userID: store().userID,
  groupID: store().groupID,
}

// TODO: team
const group = reactive({
  groupID: user.groupID,
  groupName: "你说得都队",
  ProjName: "面向群聊的聊天机器人",
  term: "2022秋",
  members: ["张同学", "王同学"],
  memberIDs: [1001, 1002],
  interests: ["机器学习", "自然语言处理"],
  introduction: "小组面向开发人员的群聊场景,提供专门的提高开发与解决问题效率的机器人.小组面向开发人员的群聊场景,提供专门的提高开发与解决问题效率的机器人.",
  qqAccount: 123123453,
});

const valid = ref(true);
const router = useRouter();
const notNullRules = reactive([v => !!v || '内容不能为空']);
const terms = reactive(["2021秋", "2022秋", "2023秋"]);

const backPage = () => {
  router.go(-1);
}


</script>