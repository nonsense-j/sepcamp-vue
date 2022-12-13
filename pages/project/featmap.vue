<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row align-start justify-center">
      <v-btn elevation="4" class="text-btn " size="x-large" prepend-icon="mdi-swap-vertical-bold"
        append-icon="mdi-swap-vertical-bold" variant="outlined">
        进度管理
      </v-btn>
    </div>
    <v-sheet>

    </v-sheet>
  </div>
</template>
<style scoped>
.card-container {
  gap: 2%;
  flex-wrap: wrap;
}

.card-subtext {
  opacity: 0.6;
}

.text-btn {
  cursor: default;
  text-transform: none;
}
</style>

<script setup>
import { store } from "~/store/store"

definePageMeta({
  layout: "content",
  middleware: ["auth",]
});

const router = useRouter();
const route = useRoute();
const user = {
  userName: store().username,
  priority: store().priority,
  userID: store().userID,
  groupID: store().groupID,
}

// record接口 type(1学生记录，2老师记录)，按照时间顺序由近到远
const featureMap = reactive({
  groupID: route.query.id,

  features: [
    {
      time: '2022-10-12-22:00',
      type: 1, // 1表示学生提交，2表示老师回复
      fileNames: ["第一版开题报告.doc", "附属说明.doc",],
      fileUrls: ["url1", "url2"],
      msg: "报告介绍了项目的业务场景，进行了相关领域痛点分析，并且划分了基础功能以及扩展功能。"
    }, {
      time: '2022-10-14-12:00',
      type: 2,
      advices: ["关于业务场景部分应该要注意对比", "基础功能的实施安排应该再详细一点"]
    }, {
      time: '2022-10-18-20:18',
      type: 1, // 1表示学生提交，2表示老师回复
      fileNames: ["第一版开题报告.doc"],
      fileUrls: ["url1"],
      msg: "已按照老师要求完成修改。"
    },
  ]
}
);

const backPage = () => {
  router.go(-1);
}
// TODO:
const upSubmit = () => {
  // flow=0 表示开题， flow=1表示结题
  router.push(`/project/submit/create?id=${route.query.id}&flow=0`);
}
const upReply = () => {
  // flow=0 表示开题， flow=1表示结题
  router.push(`/project/submit/reply?id=${route.query.id}&flow=0`);
}
const getFile = (url) => {
  // TODO:
  // 点击下载链接
  console.log(url);
}

</script>
