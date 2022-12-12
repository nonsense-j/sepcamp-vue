<template>
  <v-sheet class="mx-auto blur main-sheet mt-3 mb-6 pa-4 d-flex flex-column" rounded="lg" elevation="6">
    <div class="mx-auto">
      <v-btn elevation="2" variant="outlined" size="x-large" prepend-icon="mdi-calendar">
        <v-icon icon="mdi-circle-small" />
        {{ $route.query.date }}
        <v-icon icon="mdi-circle-small" />
        {{ typeNames[$route.query.type] }}
      </v-btn>
    </div>
    <div class="mx-auto mt-2  mb-6">
      <v-btn :color="expireColor[task.expireDate >= curDate]" variant="text" density="comfortable" class="text-btn">
        {{ checkExpire[task.expireDate >= curDate] }} </v-btn>
    </div>
    <div class="my-auto">
      <div class="d-flex flex-row align-start px-10 justify-center">
        <div class="text-h5 font-weight-bold text-no-wrap">
          问题管理
        </div>
        <v-divider vertical class="mx-5" />
        <div class="w-100">
          <v-form v-model="valid" class="d-flex flex-column" lazy-validation>
            <v-text-field v-for="(question, index) in task.questions" :key="index" v-model="contents[index]"
              :rules="contentRules" :placeholder="question" density="comfortable" variant="outlined" color="primary"
              clearable :disabled="lockEdit">
            </v-text-field>
            <div class="d-flex flex-row">
              <v-text-field v-model="selectDate" :rules="contentRules" density="comfortable" variant="outlined"
                bg-color="error" prepend-inner-icon="mdi-calendar" disabled>
              </v-text-field>
              <Datepicker v-model="fullDate" class="mx-2 pt-1" :format="dateFormat" :disabled="lockEdit"> </Datepicker>
            </div>
            <div class="d-flex flex-row">
              <v-btn class="mx-3" color="primary" size="large" append-icon="mdi-arrow-right-drop-circle-outline"
                rounded="lg" @click="lockEdit = !lockEdit">
                编辑作业
              </v-btn>
              <NuxtLink to="/task/manage" class=" text-decoration-none">
                <v-btn class="mx-3" color="primary" size="large" append-icon="mdi-arrow-right-drop-circle-outline"
                  rounded="lg" :disabled="lockEdit" @click="lockEdit = !lockEdit">
                  提交修改
                </v-btn>
              </NuxtLink>
              <v-spacer></v-spacer>
              <div v-if="!lockEdit">
                <v-btn class="mx-3" color="info" size="large" append-icon="mdi-plus-circle" rounded="lg"
                  @click="contents.push('')">
                  增加问题
                </v-btn>
                <v-btn class="mx-3" color="warning" size="large" append-icon="mdi-minus-circle" rounded="lg"
                  @click="reduceQuest">
                  减少问题
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex flex-column align-start px-10 justify-center my-6">
        <div class="text-h5 font-weight-bold text-no-wrap">
          待评分
        </div>
        <v-container>
          <div class="d-flex flex-row flex-wrap justify-center">
            <v-card v-for="(record, index) in unEvaluatedRecords" :key="index" height="130" width="200" elevation="6"
              class="mb-3 mx-3">
              <v-card-title class="bg-primary"></v-card-title>
              <v-card-item class="py-1">
                <div>
                  <div class="text-overline mb-1">
                    HOMEWORK
                  </div>
                  <div class="d-flex flex-row">
                    <div class="text-caption">
                      <v-icon icon="mdi-account-school-outline" class="mr-1" />{{ record.userName }}
                    </div>
                    <v-spacer></v-spacer>
                    <div class="text-caption">
                      <!-- TODO: -->
                      <v-icon icon="mdi-star-outline" class="mr-1" />---
                    </div>
                  </div>
                </div>
              </v-card-item>
              <v-card-actions class="py-0">
                <!-- TODO: -->
                <NuxtLink :to="`/task/evaluate?date=${task.date}&type=${task.type}&user=${record.userID}`"
                  class=" text-decoration-none">
                  <v-btn color="primary" variant="text" density="comfortable" prepend-icon="mdi-chevron-double-right">
                    查看详情
                  </v-btn>
                </NuxtLink>
              </v-card-actions>
            </v-card>
          </div>
        </v-container>
      </div>
      <div class="d-flex flex-column align-start px-10 justify-center my-6">
        <div class="text-h5 font-weight-bold text-no-wrap">
          已评分
        </div>
        <v-container>
          <div class="d-flex flex-row flex-wrap justify-center">
            <v-card v-for="(record, index) in EvaluatedRecords" :key="index" height="130" width="200" elevation="6"
              class="mb-3 mx-3">
              <v-card-title class="bg-success"></v-card-title>
              <v-card-item class="py-1">
                <div>
                  <div class="text-overline mb-1">
                    HOMEWORK
                  </div>
                  <div class="d-flex flex-row">
                    <div class="text-caption">
                      <v-icon icon="mdi-account-school-outline" class="mr-1" />{{ record.userName }}
                    </div>
                    <v-spacer></v-spacer>
                    <div class="text-caption">
                      <!-- TODO: -->
                      <v-icon icon="mdi-star-outline" class="mr-1" />{{ record.score }}
                    </div>
                  </div>
                </div>
              </v-card-item>
              <v-card-actions class="py-0">
                <!-- TODO: -->
                <NuxtLink :to="`/task/evaluate?date=${task.date}&type=${task.type}&user=${record.userID}`"
                  class=" text-decoration-none">
                  <v-btn color="success" variant="text" density="comfortable" prepend-icon="mdi-chevron-double-right">
                    查看详情
                  </v-btn>
                </NuxtLink>
              </v-card-actions>
            </v-card>
          </div>
        </v-container>
      </div>
    </div>
  </v-sheet>
</template>
<style scoped>
.blur {
  -webkit-backdrop-filter: saturate(150%) blur(30px);
  backdrop-filter: saturate(150%) blur(30px);
}

.text-btn {
  cursor: default;
}

.main-sheet {
  min-height: 80vh;
  width: 96%;
}
</style>
<script setup>
import Datepicker from '@vuepic/vue-datepicker';

const typeNames = { 0: "添加作业", 1: "课堂作业", 2: "课后作业" };
const checkExpire = { true: "未截止", false: "已截止" };
const expireColor = { true: "info", false: "error" };
const valid = ref(true);
const lockEdit = ref(true);

// TODO:
// task接口
const task = {
  date: '20221107',
  type: 1,
  questions: ["第6个Bottles版本为什么要分为两个类？", "Hotwire创新中，Stimulu解决什么问题？"],
  expireDate: '20221214',
  submitStatus: 1,
};
// 作业集接口
let unEvaluatedRecords = [];
let EvaluatedRecords = [];
for (let index = 0; index < 24; index++) {
  let user1 = {
    userName: `学生-${index}`,
    priority: 0,
    userID: 1000 + index,
    score: 0,
  };
  let user2 = {
    userName: `学生-${index + 24}`,
    priority: 0,
    id: 1000 + index,
    score: 100 - index,
  };
  EvaluatedRecords.push(user2);
  unEvaluatedRecords.push(user1);
}


const contents = ref(Array(task.questions.length).fill(''));
const contentRules = reactive([v => !!v || '问题内容不能为空']);

const route = useRoute();
console.log(route.query.date);

const reduceQuest = () => {
  if (task.questions.length > 1) {
    task.questions.pop();
  }
};

// date picker
const fullDate = ref();
let selectDate = ref(task.expireDate);
watch(fullDate, (newValue, oldValue) => {
  selectDate = `${newValue.getFullYear()}${(newValue.getMonth() + 1)}${newValue.getDate()}`;
});
const dateFormat = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
</script>