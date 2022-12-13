<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row align-start justify-space-between">
      <v-btn elevation="4" color="primary" prepend-icon="mdi-arrow-left-circle" @click="backPage()">
        返回上一级
      </v-btn>
      <v-btn elevation="4" class="text-btn" size="x-large" prepend-icon="mdi-swap-vertical-bold"
        append-icon="mdi-swap-vertical-bold" variant="outlined">
        开题提交流
      </v-btn>
      <v-btn elevation="4" color="primary"
        :append-icon="(user.groupID == $route.query.id) ? 'mdi-arrow-up-circle' : 'mdi-minus-circle'"
        @click="upSubmit()" :disabled="user.groupID != $route.query.id" class="disable-btn">
        上传材料
      </v-btn>
    </div>
    <div class="mx-auto mt-2">
      <v-btn :color="acceptColor[openWorkFlow.score >= 0]" variant="text" density="comfortable" class="text-btn">
        {{ checkAccept[openWorkFlow.score >= 0] }}:{{ openWorkFlow.score }}
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-center card-container px-10 pt-4">
      <v-timeline align="start" side="end">
        <v-timeline-item v-for="(record, i) in openWorkFlow.records" :key="i" :dot-color="typeColors[record.type]"
          size="x-small">
          <template v-slot:opposite>
            <div :class="`text-${typeColors[record.type]}`">
              <v-icon :icon="iconList[record.type]" />
              {{ record.time }}
            </div>
          </template>
          <v-card elevation="6" width="60vw">
            <v-card-title :class="`mb-2 text-subtitle-1 bg-${typeColors[record.type]}`">
            </v-card-title>
            <v-card-text class="py-0">
              <div v-if="record.type === 1">
                <v-chip-group column class="px-2">
                  <v-chip v-for="(fileName, index) in record.fileNames" :key="index" variant="outlined"
                    @click="getFile(record.fileUrls[index])">
                    <v-icon icon="mdi-file-document-outline" class="mr-1" />
                    {{ fileName }}
                  </v-chip>
                </v-chip-group>
                <v-divider class="my-1"></v-divider>
                <v-container class="px-1 py-4">
                  <v-icon icon="mdi-information-outline" class="mr-1" />
                  {{ record.msg }}
                </v-container>
              </div>
              <div v-else>
                <v-list class="text-red" density="compact">
                  <v-list-item v-for="advice in record.advices" :key="advice">
                    <v-icon icon="mdi-square-medium" />
                    {{ advice }}
                  </v-list-item>
                </v-list>
              </div>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>
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

const user = {
  userName: store().username,
  priority: store().priority,
  userID: store().userID,
  groupID: store().groupID,
}

const router = useRouter();
const route = useRoute();
const backPage = () => {
  router.go(-1);
}
// TODO:
const upSubmit = () => {
  // flow=0 表示开题， flow=1表示结题
  router.push(`/project/submit/create?id=${route.query.id}&flow=0`);
}
const getFile = (url) => {
  // TODO:
  // 点击下载链接
  console.log(url);
}

const typeColors = { 1: "primary", 2: "red" };
const iconList = { 1: "mdi-calendar", 2: "mdi-message-reply-text" };
const checkAccept = { false: "未评分", true: "已评分" };
const acceptColor = { false: "warning", true: "success" };

// record接口 type(1学生记录，2老师记录)，按照时间顺序由近到远
const openWorkFlow = reactive({
  groupID: route.query.id,
  score: 90, // score=-1表示没有接受
  records: [
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

</script>
