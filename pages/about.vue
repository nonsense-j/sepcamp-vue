<template>
  <div class="d-flex flex-column justify-center align-center">
    <div class="my-auto w-75 mt-15">
      <v-table class="elevation-10 pa-2">
        <thead>
          <tr>
            <th class="text-left">
              团队成员
            </th>
            <th class="text-left">
              研究兴趣
            </th>
            <th class="text-left">
              负责分工
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in members" :key="item.name">
            <td>{{ item.name }}</td>
            <td>
              <v-chip-group column class="py-2 text-primary">
                <v-chip density="comfortable" v-for="interest in item.interests" :key="interest" variant="outlined">
                  {{ interest }}
                </v-chip>
              </v-chip-group>
            </td>
            <td>{{ item.work }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "main",
});
const members = [{
  name: "李煜宸",
  interests: ["编译系统", "程序分析", "人工智能"],
  work: "基于Springbot的后端实现,包括登录认证等接口功能。"
}, {
  name: "刘珺",
  interests: ["程序分析", "交互设计", "自然语言处理"],
  work: "基于Nuxt3和Vuetify的前端网页实现。"
}, {
  name: "丁嘉欣",
  interests: ["数据库", "机器学习", "软件工程"],
  work: "数据库维护以及数据相关接口设计。"
}]
</script>
