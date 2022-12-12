<template>
  <div class="d-flex flex-row justify-center card-container px-10 pt-15 pb-5">
    <v-hover v-slot="{ isHovering, props }">
      <v-card class="mx-auto mb-10" width="320px" :elevation="isHovering ? 24 : 10" v-bind="props">
        <v-img :src=workImg height="200px" cover></v-img>

        <v-card-title>
          <v-icon>mdi-format-list-checks</v-icon>
          作业管理
        </v-card-title>

        <v-card-text class="card-subtext mx-2">
          课堂作业以及课后作业提交以及记录。
          支持统一高效地提供作业提交与收集。
        </v-card-text>
        <v-spacer />
        <v-divider length="80%" class="mx-4 mt-2"></v-divider>

        <v-card-actions>
          <v-spacer />
          <NuxtLink :to="taskLink" class=" text-decoration-none">
            <v-btn color="orange-lighten-1" variant="text" prepend-icon="mdi-chevron-double-right">
              立即跳转
            </v-btn>
          </NuxtLink>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-hover v-slot="{ isHovering, props }" v-if="notTeacher">
      <v-card class="mx-auto mb-10" width="320px" :elevation="isHovering ? 24 : 10" v-bind="props">
        <v-img :src=ideaImg height="200px" cover></v-img>

        <v-card-title>
          <v-icon>mdi-lightbulb-group-outline</v-icon>
          项目广场
        </v-card-title>

        <v-card-text class="card-subtext mx-2 flex-fill">
          查看课程其它同学已经发布的项目以及以往项目合集。想不到合适的项目之时，不妨看看其他同学的Idea？
        </v-card-text>
        <v-divider length="80%" class="mx-4 mt-2"></v-divider>

        <v-card-actions>
          <v-spacer />
          <NuxtLink to="/project/showall" class=" text-decoration-none">
            <v-btn color="orange-lighten-1" variant="text" prepend-icon="mdi-chevron-double-right">
              立即跳转
            </v-btn>
          </NuxtLink>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-hover v-slot="{ isHovering, props }">
      <v-card class="mx-auto mb-10" width="320px" :elevation="isHovering ? 24 : 10" v-bind="props">
        <v-img :src=projImg height="200px" cover></v-img>

        <v-card-title>
          <v-icon>mdi-webhook</v-icon>
          项目管理
        </v-card-title>

        <v-card-text class="card-subtext mx-2">
          {{ projText }}
        </v-card-text>
        <v-divider length="80%" class="mx-4 mt-2"></v-divider>

        <v-card-actions>
          <v-spacer />
          <NuxtLink :to="projectLink" class=" text-decoration-none">
            <v-btn color="orange-lighten-1" variant="text" prepend-icon="mdi-chevron-double-right">
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
import workimg from '~/assets/image/homework.jpg'
import ideaimg from '~/assets/image/ideas.jpg'
import projimg from '~/assets/image/project.jpg'
import {store} from "~/store/store"

definePageMeta({
  layout: "main",
});

const user = {
  userName: store().username,
  priority: store().priority,
}

const taskLink = user.priority ? "/task/manage" : "/task/taskflow";
const projectLink = user.priority ? "/project/manage" : "/project/board";
const notTeacher = !user.priority;
const projText = user.priority ? "教师可以通过查看管理所有课程学生项目，对项目的提交情况以及功能点进度进行检查以及提供意见。" : "在开始进行你的项目之前，你需要首先在我的小队中进行组队。组队完成后可进入查看项目进度管理。";
const workImg = workimg;
const ideaImg = ideaimg;
const projImg = projimg;

</script>
