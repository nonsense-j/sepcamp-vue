<template>
  <div>
    <v-sheet class="mx-auto blur main-sheet mt-3 mb-6 pa-4 d-flex flex-column" rounded="lg" elevation="6">
      <v-form ref="form" class="d-flex flex-column">
        <div class="d-flex flex-column justify-center">
          <v-btn elevation="2" width="30%" variant="outlined" size="x-large" class="mx-auto mt-2"
            prepend-icon="mdi-calendar">
            <v-icon icon="mdi-circle-small" />
            {{ $route.query.date }}
            <v-icon icon="mdi-circle-small" />
            {{ typeNames[$route.query.type] }}
          </v-btn>
          <div class="mx-auto mt-2">
            <v-btn :color="submitColor[task.submitStatus]" variant="text" density="comfortable" class="text-btn">
              {{ checkSubmit[task.submitStatus] }}
            </v-btn>
            <v-icon icon="mdi-triangle-small-up"></v-icon>
            <v-btn :color="expireColor[task.expireDate >= curDate]" variant="text" density="comfortable"
              class="text-btn">
              {{ checkExpire[task.expireDate >= curDate] }} </v-btn>
          </div>
          <v-container>
            <v-list class="py-0">
              <v-list-item v-for="(question, index) in task.questions" :key="index">
                <div class="mt-5 mb-3 text-primary">
                  <v-icon :icon="`mdi-numeric-${index + 1}-box-multiple-outline`" class="mr-2" />
                  {{ question }}
                </div>
                <vue3-tinymce v-if="isRouterAlive" v-model="contents[index]" :setting="setting"
                  :disabled="task.expireDate < curDate" />
              </v-list-item>
              <v-divider length="40%" class="mt-5"></v-divider>
              <v-list-item>
                <div class="my-3 text-info">
                  <v-icon icon="mdi-pencil-box-multiple-outline" class="mr-2" />
                  关于本作业或者课程的建议与反馈（可选）：
                </div>
                <vue3-tinymce v-if="isRouterAlive" v-model="feedback" :setting="setting"
                  :disabled="task.expireDate < curDate" />
              </v-list-item>
            </v-list>
          </v-container>
        </div>
      </v-form>
      <div class="mx-auto ">
        <v-btn class="mb-6 mx-4" color="primary" @click="startText">
          展开编辑
        </v-btn>
        <v-btn class="mb-6 mx-4" color="primary" @click="checkText" :disabled="task.expireDate < curDate">
          确认提交
        </v-btn>
      </div>
    </v-sheet>
    <v-snackbar v-model="snackbar" class="text-button">
      点击展开编辑器,使用富文本编辑器提交或查看你的答案。问题答案不可为空！
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
}

.main-sheet {
  min-height: 90vh;
}
</style>
<script setup>
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce';

definePageMeta({
  middleware: ["auth"]
});
// 作业接口
const task = {
  date: '20221107',
  type: 1,
  questions: ["第6个Bottles版本为什么要分为两个类？", "Hotwire创新中，Stimulu解决什么问题？"],
  answers: ["分为两类更便于维护", "Stimulus 是一个抱负不大的 JavaScript 框架。它并不试图接管你的整个前端——事实上，它根本不关心渲染 HTML。相反，它旨在通过足够的行为来增强您的 HTML，使其大放异彩。 Stimulus 与 Turbo 完美搭配，以最少的工作量为快速、引人注目的应用程序提供完整的解决方案"],
  expireDate: '20221114',
  submitStatus: 1,
};

// 富文本编辑器
let contents = ref(Array(task.questions.length).fill(""));
if (task.submitStatus) {
  contents = task.answers;
}

const feedback = ref("");
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
const isRouterAlive = ref(true);
const startText = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};

const snackbar = ref(true);

// 检查非空
const router = useRouter();
const checkText = () => {
  for (let i = 0; i < task.questions.length; i++) {
    if (!contents.value[i]) {
      alert("除了反馈建议，每一个问题都不能空白提交！");
      return;
    }
  }
  router.push("/task/taskflow");
};

const typeNames = { 1: "课堂作业", 2: "课后作业" };
const checkSubmit = { 0: "未提交", 1: "已提交" };
const submitColor = { 0: "warning", 1: "success" };
const checkExpire = { true: "未截止", false: "已截止" };
const expireColor = { true: "info", false: "error" };

let now = new Date();
const year = now.getFullYear().toString();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
let curDate = year + month + day;

</script>