<template>
  <div>
    <v-sheet class="mx-auto blur main-sheet mt-3 mb-6 pa-4" rounded="lg" elevation="6">
      <div class="d-flex flex-column justify-center">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-btn elevation="2" width="50%" size="x-large" variant="outlined" v-bind="props" class="mx-auto mb-5"
              :color="isHovering ? 'primary' : undefined">- 作业提交流 -</v-btn>
          </template>
        </v-hover>
        <v-container>
          <v-timeline align="start" side="end">
            <v-timeline-item v-for="(task, i) in tasks" :key="i" :dot-color="typeColors[task.type]" size="small">
              <template v-slot:opposite>
                <div class="pt-1 text-primary">
                  <v-icon>mdi-calendar</v-icon>
                  {{ task.date.toLocaleString().split(" ")[0] }}
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
                      {{ question }}
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions class="py-0 pr-2">
                  <NuxtLink :to="`/task/submit?id=${task.id}`" class=" text-decoration-none">
                    <v-btn :color="typeColors[task.type]" variant="text" density="comfortable"
                      prepend-icon="mdi-chevron-double-right">
                      查看详情
                    </v-btn>
                  </NuxtLink>
                  <v-spacer></v-spacer>
                  <v-btn :color="submitColor[task.submitStatus]" variant="outlined" density="comfortable"
                    class="text-btn">
                    {{ checkSubmit[task.submitStatus] }}
                  </v-btn>
                  <v-divider length="50%" vertical class="mx-1 my-auto"></v-divider>
                  <v-btn :color="expireColor[task.expireDate >= now]" variant="outlined" density="comfortable"
                    class="text-btn">
                    {{ checkExpire[task.expireDate >= now] }} </v-btn>
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
import axios from "axios";
import {store} from "~/store/store";

definePageMeta({
  middleware: ["auth"]
});

const typeColors = { '1': "cyan", '2': "amber" };
const typeNames = { '1': "课堂作业", '2': "课后作业" };
const checkSubmit = { 0: "未提交", 1: "已提交" };
const submitColor = { 0: "warning", 1: "success" };
const checkExpire = { true: "未截止", false: "已截止" };
const expireColor = { true: "info", false: "error" };

const tasks = reactive([])

axios.defaults.headers['authorization'] = store().token
axios.post(store().serverURL + "homework/getOneUserList")
    .then(response => {
      let data = response.data
      for(let i = 0; i < data.length; i ++) {
        tasks.push({
          date: new Date(data[i].start_Time),
          type: data[i].homework_Type,
          questions: data[i].describe_Text.split('\u0001'),
          expireDate: new Date(data[i].end_Time),
          submitStatus: data[i].is_Submitted ? 1 : 0,
          id: data[i].homework_Id
        })
      }
    })
    .catch(error => {
      console.log(error)
    })

let now = new Date();

</script>