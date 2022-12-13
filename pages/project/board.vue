<template>
  <div class="d-flex flex-row justify-center card-container px-15 pt-15 pb-5">
    <v-hover v-slot="{ isHovering, props }">
      <v-card class="mx-auto mb-10" width="420px" :elevation="isHovering ? 14 : 6" v-bind="props">
        <v-img :src=submitImg height="200px" cover></v-img>

        <v-card-title>
          <v-icon>mdi-swap-vertical-bold</v-icon>
          提交管理
        </v-card-title>

        <v-card-text class="card-subtext mx-2">
          主要针对项目开题过程、结题过程需要提交的相关文档以及答辩材料进行管理。在支持材料上传基础上，允许老师和学生进行对话，用工作流的方式记录了这些材料的更新过程。
        </v-card-text>
        <v-spacer />
        <v-divider length="80%" class="mx-4 mt-2"></v-divider>

        <v-card-actions>
          <v-spacer />
          <NuxtLink to="/project/submit/list" class=" text-decoration-none">
            <v-btn color="primary" variant="text" prepend-icon="mdi-chevron-double-right">
              立即跳转
            </v-btn>
          </NuxtLink>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-hover v-slot="{ isHovering, props }">
      <v-card class="mx-auto mb-10" width="420px" :elevation="isHovering ? 14 : 6" v-bind="props">
        <v-img :src=featImg height="200px" cover></v-img>

        <v-card-title>
          <v-icon>mdi-sitemap</v-icon>
          进度管理
        </v-card-title>

        <v-card-text class="card-subtext mx-2 flex-fill">
          课程网站基于项目功能点对项目进行管理。每一个小组在完成功能点划分后，可以对于每一个功能点记录实现进度，以工作流的形式保存更新情况。
        </v-card-text>
        <v-divider length="80%" class="mx-4 mt-2"></v-divider>

        <v-card-actions>
          <v-spacer />
          <NuxtLink :to="`/project/featmap?id=${user.groupID}`" class=" text-decoration-none">
            <v-btn color="primary" variant="text" prepend-icon="mdi-chevron-double-right">
              立即跳转
            </v-btn>
          </NuxtLink>
        </v-card-actions>
      </v-card>
    </v-hover>
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
</style>

<script setup>
import submitimg from '~/assets/image/submits.jpg'
import featimg from '~/assets/image/features.jpg'
import { store } from "~/store/store"


definePageMeta({
  layout: "content",
  middleware: ["auth"]
});

const user = {
  userName: store().username,
  priority: store().priority,
  userID: store().userID,
  groupID: store().groupID,
}

const submitImg = submitimg;
const featImg = featimg;

</script>
