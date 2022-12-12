<template>
  <div>
    <v-sheet class="mx-auto blur main-sheet mt-3 mb-6 pa-4" rounded="lg" elevation="6">
      <div class="d-flex flex-column justify-center">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-btn elevation="2" width="50%" size="x-large" variant="outlined" v-bind="props" class="mx-auto mb-5"
              :color="isHovering ? 'primary' : undefined">** 作业管理流 **</v-btn>
          </template>
        </v-hover>
        <div class="mx-auto">
          <NuxtLink to="/task/new" class=" text-decoration-none">
            <v-btn elevation="4" icon="mdi-plus-circle" color="primary" />
          </NuxtLink>
        </div>
        <v-container>
          <v-timeline align="start" side="end">
            <v-timeline-item v-for="(task, i) in tasks" :key="i" :dot-color="typeColors[task.type]" size="small">
              <template v-slot:opposite>
                <div class="pt-1 text-primary">
                  <v-icon>mdi-calendar</v-icon>
                  {{ task.date }}
                </div>
              </template>
              <v-card elevation="6" width="60vw">
                <v-card-title :class="`mb-2 text-subtitle-1 bg-${typeColors[task.type]}`">
                  {{ typeNames[task.type] }}
                </v-card-title>
                <v-card-text class="py-0">
                  <v-list class="py-0">
                    <v-list-item v-for="question in task.questions" :key="question" class="py-0">
                      <v-icon icon="mdi-help-circle-outline" />
                      {{ question }}</v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions class="py-0 pr-2">
                  <NuxtLink :to="`/task/edit?date=${task.date}&type=${task.type}`" class=" text-decoration-none">
                    <v-btn :color="typeColors[task.type]" variant="text" density="comfortable"
                      prepend-icon="mdi-chevron-double-right">
                      提交情况
                    </v-btn>
                  </NuxtLink>
                  <v-spacer></v-spacer>
                  <v-btn :color="expireColor[task.expireDate >= curDate]" variant="outlined" density="comfortable"
                    class="text-btn mr-4">
                    {{ checkExpire[task.expireDate >= curDate] }} </v-btn>
                </v-card-actions>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </div>
    </v-sheet>
    <div class="w-100 my-4">
      <v-divider length="20%" class="mx-auto"></v-divider>
    </div>
  </div>
</template>
<style scoped>
.text-btn {
  cursor: default;
}

.blur {
  -webkit-backdrop-filter: saturate(150%) blur(30px);
  backdrop-filter: saturate(150%) blur(30px);
}

.main-sheet {
  width: 96%;
  min-height: 400px;
}
</style>
<script setup>
definePageMeta({
  layout: "default",
});

const typeColors = { '1': "cyan", '2': "amber" };
const typeNames = { '1': "课堂作业", '2': "课后作业" };
const checkExpire = { true: "未截止", false: "已截止" };
const expireColor = { true: "info", false: "error" };


// 任务接口 type(1课堂作业，2课后作业)
const tasks = ref([
  {
    date: '20221212',
    type: 2,
    questions: ["如果已知一个Web应用的所有源代码，你将如何进行安全加固？"],
    expireDate: '20221219',
    submitStatus: 0,
  }, {
    date: '20221116',
    type: 2,
    questions: ["根据今天的讲课Chat软件，增加一个用户注册和登录功能。"],
    expireDate: '20221123',
    submitStatus: 1,
  }, {
    date: '20221107',
    type: 1,
    questions: ["第6个Bottles版本为什么要分为两个类？", "Hotwire创新中，Simulu解决什么问题？"],
    expireDate: '20221114',
    submitStatus: 1,
  }, {
    date: '20221107',
    type: 2,
    questions: ["若用机器学习来完成song, verse(number),verses(starting, ending)等任务，你论证一下是否可以实现。如果上述问题可以，你应该如何设计数据集，神经网络和训练程序？"],
    expireDate: '20221114',
    submitStatus: 1,
  },
]);

let now = new Date();
const year = now.getFullYear().toString();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
let curDate = year + month + day;

</script>