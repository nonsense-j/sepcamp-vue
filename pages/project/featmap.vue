<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row align-start justify-center mb-4">
      <v-btn elevation="4" class="text-btn " size="x-large" prepend-icon="mdi-swap-vertical-bold"
        append-icon="mdi-swap-vertical-bold" variant="outlined">
        进度管理
      </v-btn>
    </div>
    <v-sheet v-for="(fName, fIndex) in featureMap.featureNames" :key="fIndex" class="d-flex flex-column py-8 px-4">
      <v-btn size="large" color="primary" class="text-btn">{{ fName }}</v-btn>
      <div class="mt-6">
        <v-timeline direction="horizontal">
          <v-timeline-item v-for="(feature, index) in featureMap.featureInfos[fIndex]" :key="index"
            icon="mdi-map-marker-star" fill-dot dot-color="white">
            <div class="d-flex flex-column justify-center align-center">
              <div class="mb-2">
                <v-chip v-for="editor in feature.editors" class="ml-1" color="info" label size="small">
                  {{ editor }}
                </v-chip>
              </div>
              <v-responsive class="border py-2 px-2">
                {{ feature.msg }}
              </v-responsive>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
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
  count: 3,
  featureNames: ["登陆注册实现", "文件上传下载管理", "页面路由权限划分"],
  featureInfos: [[{
    time: '2022-10-12',
    editors: ["Aurora", "Charlie"],
    msg: "第一阶段实现：环境部署"
  }, {
    time: '2022-10-20',
    editors: ["Aurora"],
    msg: "完成前端设计"
  }, {
    time: '2022-11-18',
    editors: ["Charlie"],
    msg: "完成后端接口设计"
  }], [{
    time: '2022-10-26',
    editors: ["Aurora", "Charlie"],
    msg: "环境部署完成"
  }, {
    time: '2022-11-1',
    editors: ["Aurora"],
    msg: "获取到了阿里云的OSS API"
  }, {
    time: '2022-11-20',
    editors: ["Aurora"],
    msg: "文件管理demo测试通过"
  }, {
    time: '2022-12-10',
    editors: ["Charlie"],
    msg: "前后端交互组件完成"
  }], [{
    time: '2022-10-4',
    editors: ["Aurora", "Charlie"],
    msg: "环境部署完成"
  }, {
    time: '2022-10-27',
    editors: ["Aurora"],
    msg: "demo样例跑通"
  }, {
    time: '2022-11-23',
    editors: ["Charlie"],
    msg: "迁移成功"
  }],
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
