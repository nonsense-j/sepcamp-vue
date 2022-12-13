<template>
  <div class="d-flex flex-column">
    <div class="mx-auto">
      <v-btn elevation="4" class="text-btn" size="x-large" prepend-icon="mdi-swap-vertical-bold"
        append-icon="mdi-swap-vertical-bold" variant="outlined">
        提交管理
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-center card-container px-10 pt-4">
      <v-hover v-slot="{ isHovering, props }">
        <v-card class="mx-auto mb-5" width="420px" :elevation="isHovering ? 14 : 6" v-bind="props">
          <v-img :src=submitImg height="200px" cover></v-img>

          <v-card-title>
            <v-icon>mdi-swap-vertical-bold</v-icon>
            开题提交流
          </v-card-title>

          <v-card-text class="card-subtext mx-2">
            主要针对项目开题过程过程需要提交的相关文档以及答辩材料进行管理。在支持材料上传基础上，允许老师和学生进行对话，用工作流的方式记录了这些材料的更新过程。
          </v-card-text>
          <v-spacer />
          <v-divider length="80%" class="mx-4 mt-2"></v-divider>

          <v-card-actions>
            <v-spacer />
            <NuxtLink :to="`/project/submit/openflow?id=${user.groupID}`" class=" text-decoration-none">
              <v-btn color="primary" variant="text" prepend-icon="mdi-chevron-double-right">
                立即跳转
              </v-btn>
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </v-hover>
      <v-hover v-slot="{ isHovering, props }">
        <v-card class="mx-auto mb-5" width="420px" :elevation="isHovering ? 14 : 6" v-bind="props">
          <v-img :src=submitImg height="200px" cover></v-img>

          <v-card-title>
            <v-icon>mdi-swap-vertical-bold</v-icon>
            结题提交流
          </v-card-title>

          <v-card-text class="card-subtext mx-2">
            主要针对项目结题过程过程需要提交的相关文档以及答辩材料进行管理。在支持材料上传基础上，允许老师和学生进行对话，用工作流的方式记录了这些材料的更新过程。
          </v-card-text>
          <v-spacer />
          <v-divider length="80%" class="mx-4 mt-2"></v-divider>

          <v-card-actions>
            <v-spacer />
            <NuxtLink :to="`/project/submit/endflow?id=${user.groupID}`" class=" text-decoration-none">
              <v-btn color="primary" variant="text" prepend-icon="mdi-chevron-double-right">
                立即跳转
              </v-btn>
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </v-hover>
    </div>
    <div class="mx-auto">
      <v-btn elevation="4" color="primary" append-icon="mdi-arrow-left-circle" @click="backPage()">
        返回上一级
      </v-btn>
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
import submitimg from '~/assets/image/submits.jpg'
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
const router = useRouter();
const backPage = () => {
  router.go(-1);
}

</script>
