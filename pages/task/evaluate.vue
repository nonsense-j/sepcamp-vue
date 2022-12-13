<template>
  <div>
    <v-sheet class="mx-auto blur main-sheet mt-3 mb-6 pa-4 d-flex flex-column" rounded="lg" elevation="6">
      <v-form ref="form" class="d-flex flex-column">
        <div class="d-flex flex-column justify-center">
          <v-btn elevation="2" width="30%" variant="outlined" size="x-large" class="mx-auto mt-2 text-btn"
            prepend-icon="mdi-calendar">
            <v-icon icon="mdi-circle-small" />
            {{ task.date.split(' ')[0] }}
            <v-icon icon="mdi-circle-small" />
            {{ typeNames[task.type] }}
            <v-icon icon="mdi-circle-small" />
            {{ user.userName }}
          </v-btn>
          <div class="mx-auto mt-2">
            <v-btn :color="expireColor[new Date(task.expireDate) >= now]" variant="text" density="comfortable"
              class="text-btn">
              {{ checkExpire[new Date(task.expireDate) >= now] }} </v-btn>
          </div>
          <v-container>
            <v-list class="py-0">
              <v-list-item v-for="(question, index) in task.questions" :key="index">
                <div class="mt-5 mb-3 text-primary">
                  <v-icon :icon="`mdi-numeric-${index + 1}-box-multiple-outline`" class="mr-2" />
                  {{ question }}
                </div>
                <vue3-tinymce v-if="isRouterAlive" v-model="contents[index]" :setting="setting" disabled />
              </v-list-item>
              <v-divider length="40%" class="mt-5"></v-divider>
              <v-list-item>
                <div class="my-3 text-info">
                  <v-icon icon="mdi-pencil-box-multiple-outline" class="mr-2" />
                  关于本作业或者课程的建议与反馈（可选）：
                </div>
                <vue3-tinymce v-if="isRouterAlive" v-model="contents[index]" :setting="setting" disabled />
              </v-list-item>
            </v-list>
          </v-container>
        </div>
      </v-form>

      <div class="mx-auto ">
        <v-btn class="mb-6 mx-4" color="primary" @click="startText">
          展开编辑
        </v-btn>
      </div>
      <div v-if="isRouterAlive" class="d-flex my-3 flex-row justify-center">
        <div class=" w-33">
          <v-slider v-model="score"></v-slider>
        </div>
        <div class=" mx-2 text-h5 text-primary">{{ Math.trunc(score) }}</div>
        <!-- TODO: -->
        <v-btn class="mb-6 mx-4" color="primary" @click="submitScore">
          提交分数
        </v-btn>
      </div>
    </v-sheet>
    <v-snackbar v-model="snackbar" class="text-button">
      点击展开编辑器开始评分。
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          关闭提示
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style scoped>
.blur {
  -webkit-backdrop-filter: saturate(150%) blur(30px);
  backdrop-filter: saturate(150%) blur(30px);
}

.text-btn {
  cursor: default;
  text-transform: none;
}

.main-sheet {
  min-height: 90vh;
}
</style>
<script setup>
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import {store} from "~/store/store";
import axios from "axios";

const global_store = store()
const route = useRoute();
const homework_id = route.query.id
const user_id = route.query.user
const username = route.query.username

definePageMeta({
  middleware: ["onlyadmin"]
});

definePageMeta({
  middleware: ["onlyadmin"]
});

// 作业接口
const task = reactive({
  date: '20221107',
  type: 1,
  questions: [],
  answers: [],
  expireDate: '20221114',
  submitStatus: 1,
});
const user = {
  username: username
};

// 富文本编辑器
let contents = ref(Array(task.questions.length).fill(""));
if (task.submitStatus) {
  contents = task.answers;
}

axios.defaults.headers['authorization'] = global_store.token
axios.post(global_store.serverURL + "homework/getOneWithUser", {
  homework_Id: homework_id,
  user_Id: user_id
})
    .then(response => {
      let data = response.data
      task.date = data.start_Time
      task.type = data.homework_Type
      task.questions = data.describe_Text.split('\u0001')
      task.expireDate = data.end_Time
      task.submitStatus = data.is_Submitted
      if(data.is_Submitted) {
        let answers = data.text_Answer.split('\u0001')
        for(let i = 0; i < answers.length; i ++) contents[i] = answers[i]
      }
    })


const setting = {
  menubar: false,
  height: 300,
  toolbar:
    'bold italic underline h1 h2 blockquote codesample numlist bullist link image | removeformat fullscreen',
  plugins: 'codesample link image table lists fullscreen',
  toolbar_mode: 'sliding',
  nonbreaking_force_tab: true,
  link_title: false,
  link_default_target: '_blank',
  content_style: 'body{font-size: 16px}',
  // 自定义 图片上传模式
  custom_images_upload: true,
  images_upload_url: 'your_upload_api_url...',
  custom_images_upload_callback: (res) => res.url,
  custom_images_upload_param: { id: 'xxxx01', age: 18 },
};
// 局部组件刷新
const isRouterAlive = ref(false);
const startText = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};

const snackbar = ref(true);
const score = ref(0);

// 检查非空
const router = useRouter();
const submitScore = () => {
  if (score) {
    // TODO: 
    // 添加score=${Math.trunc(score)}作为参数给后端更新本user的作业分数
    axios.defaults.headers['authorization'] = global_store.token
    axios.post(global_store.serverURL + "homework/updateScore", {
      homework_Id: homework_id,
      user_Id: user_id,
      score: score.value
    })
        .then(response => {
          let data = response.data
          if(data.success) {
            alert(data.message)
            router.go(-1);
          }
          else {
            alert(data.message)
          }
        })
  }
  else
    alert("请拖动线条进行打分~");
};

const typeNames = { 1: "课堂作业", 2: "课后作业" };
const checkExpire = { true: "未截止", false: "已截止" };
const expireColor = { true: "info", false: "error" };

let now = new Date();
const year = now.getFullYear().toString();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
let curDate = year + month + day;

</script>