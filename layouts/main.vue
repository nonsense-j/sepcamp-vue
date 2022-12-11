<template>
  <v-app class="font-pFang">
    <v-app-bar elevation="6" density="comfortable" rounded='lg'
      :style="{ backgroundColor: `${data.bgColor}!important` }" class="blur main-bar mt-4">
      <v-app-bar-title class="font-comic">
        <NuxtLink to="/" class=" text-decoration-none" :style="{ color: `${data.textColor}` }">sepcamp</NuxtLink>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <NuxtLink :to="taskLink" class=" text-decoration-none" :style="{ color: `${data.textColor}` }">
        <v-btn class="text-btn px-2">
          作业管理
        </v-btn>
      </NuxtLink>
      <v-icon icon="mdi-circle-small" />
      <NuxtLink to="/project/showall" class=" text-decoration-none" :style="{ color: `${data.textColor}` }">
        <v-btn class="text-btn px-2">
          项目广场
        </v-btn>
      </NuxtLink>
      <v-icon icon="mdi-circle-small" />
      <NuxtLink :to="projectLink" class=" text-decoration-none" :style="{ color: `${data.textColor}` }">
        <v-btn class="text-btn px-2">
          项目管理
        </v-btn>
      </NuxtLink>
      <v-icon icon="mdi-circle-small" />
      <div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              我的<v-icon icon="mdi-chevron-down" />
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in userItems" :key="index" :value="index">
              <v-list-item-title class=" text-caption">
                <NuxtLink :to=item.url class=" text-decoration-none" :style="{ color: `${data.textColor}` }">
                  {{ item.title }}
                </NuxtLink>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-divider length="50%" vertical class="mx-1 my-auto"></v-divider>
      <v-btn :prepend-icon=data.themeIcon @click="toggleTheme">切换主题</v-btn>
      <v-divider length="50%" vertical class="mx-1 my-auto"></v-divider>
      <NuxtLink class=" text-decoration-none" to='/login'>
        <v-btn :prepend-icon=data.userIcon append-icon="mdi-login" class="mr-1 text-btn">
          {{ data.userName }}
        </v-btn>
      </NuxtLink>
    </v-app-bar>

    <v-main class="app-main">
      <v-parallax :src=data.bgImage class="fixed-bg">
        <div class="d-flex flex-column fill-height justify-center align-center text-white pb-8">
          <h1 class="text-h2 font-weight-thin mb-4">
            SEPCAMP
          </h1>
          <h4 class="text-subtitle-1">
            《高级软件工程》专属课程管理平台
          </h4>
        </div>
      </v-parallax>
      <v-sheet class="mx-auto blur main-sheet" :color=data.bgColor rounded="lg" elevation="6">

        <slot />
      </v-sheet>

    </v-main>
    <v-footer class="d-flex flex-column my-4">
      <div class=" d-flex w-100 align-center px-4">
        <v-icon>mdi-star-half</v-icon>
        有任何疑问或者想交流，欢迎联系我们~

        <v-spacer></v-spacer>

        <v-btn v-for="(icon, index) in icons" :key="index" variant="plain">
          <v-icon :icon="icon.name"></v-icon>
          <v-tooltip activator="parent" location="top">{{ icon.tip }}</v-tooltip>
        </v-btn>

      </div>

      <div class="my-1 px-4 py-2 text-right w-100 blur elevation-4 text-subtitle-2"
        :style="{ backgroundColor: `${data.bgColor}!important` }">
        All rights reserved. Copyright
        <v-icon>mdi-copyright</v-icon> {{ new Date().getFullYear() }}
        SEPCAMP by
        <NuxtLink to="/about" class=" text-decoration-none">
          <v-btn variant="plain" class="text-btn px-0" density="compact">
            sepgroup
          </v-btn>
        </NuxtLink>
        .
      </div>
    </v-footer>

  </v-app>

</template>
<style scoped>
@import "~/assets/css/customFonts.css";

.fixed-bg {
  /* background-image: url(~/assets/image/lightSky.jpg); */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  height: 60vh;
}

.blur {
  -webkit-backdrop-filter: saturate(150%) blur(30px);
  backdrop-filter: saturate(150%) blur(30px);
}

.text-btn {
  text-transform: none;
}

.move-top {
  position: absolute;
  top: 0;
  left: 0;
}

.main-bar {
  width: 90% !important;
  margin-left: 5%;
}

.app-main {
  padding-top: 0 !important;
}

.main-sheet {
  width: 96%;
  position: relative;
  margin-top: -10vh;
  min-height: 400px;
}
</style>
<script setup>
import { useTheme } from 'vuetify'
import lightImg from '~/assets/image/lightCode.jpg'
import darkImg from '~/assets/image/darkCode.jpg'
import {store} from "~/store/store";

// 用户接口
const user = {
  userName: store().username,
  priority: store().priority,
}

const theme = useTheme();
let data = reactive({
  bgImage: theme.global.current.value.dark ? darkImg : lightImg,
  themeIcon: theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny',
  userIcon: 'mdi-account-question-outline',
  userName: '未登录',
  bgColor: theme.global.current.value.dark ? '#000a' : '#fffc',
  textColor: theme.global.current.value.dark ? 'white' : 'black',
});
let icons = ref([
  { name: "mdi-qqchat", tip: "3225910772" },
  { name: "mdi-email", tip: "3225910772@qq.com" },
  { name: "mdi-github", tip: "nonsense-j/sepcamp-vue" }
]);
let userItems = ref([
  { title: '个人信息', url: '/info/profile' },
  { title: '我的小队', url: '/info/group' }
]);
let taskLink = ref("/task/taskflow");
let projectLink = ref("/project/board");
if (user.userName.length !== 0) {
  data.userName = user.userName;
  data.userIcon = 'mdi-account-check-outline';
}
// 老师--修改作业管理跳转，项目管理跳转以及修改用户登陆图标
if (user.priority === 1) {
  taskLink = "/task/manage";
  projectLink = "/project/manage"
  data.userIcon = 'mdi-account-key-outline';
}

const toggleTheme = () => {
  data.bgImage = theme.global.current.value.dark ? lightImg : darkImg;
  data.themeIcon = theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night';
  data.bgColor = theme.global.current.value.dark ? '#fffc' : '#0003';
  data.textColor = theme.global.current.value.dark ? 'black' : 'white';
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>