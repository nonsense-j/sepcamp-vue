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
      <div v-show="notTeacher">
        <v-icon icon="mdi-circle-small" />
        <NuxtLink to="/project/showall" class=" text-decoration-none" :style="{ color: `${data.textColor}` }">
          <v-btn class="text-btn px-2">
            项目广场
          </v-btn>
        </NuxtLink>
      </div>
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
                <NuxtLink :to="`${item.url}?id=${idList[index]}`" class=" text-decoration-none"
                  :style="{ color: `${data.textColor}` }">
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
        <div class="d-flex flex-column fill-height justify-start align-center text-white pb-8">
          <h1 class="text-h3 font-weight-thin title-pos">
            项目管理
          </h1>
        </div>
      </v-parallax>
      <v-sheet class="mx-auto blur main-sheet pa-4" :color=data.bgColor rounded="lg" elevation="6">

        <slot />
      </v-sheet>

    </v-main>
    <v-footer class="d-flex flex-column my-4">
      <div class="w-100">
        <v-divider length="20%" class="mx-auto"></v-divider>
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

.title-pos {
  margin-top: 15vh;
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
  margin-top: -30vh;
  min-height: 1400px;
}
</style>
<script setup>
import { useTheme } from 'vuetify'
import bgImg from '~/assets/image/board.jpg'
import { store } from "~/store/store";

const user = {
  userName: store().username,
  priority: store().priority,
  userID: store().userID,
  groupID: store().groupID,
}
const idList = ref([user.userID, user.groupID]);

const theme = useTheme();
let data = reactive({
  bgImage: bgImg,
  themeIcon: theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny',
  userIcon: 'mdi-account-question-outline',
  userName: '未登录',
  bgColor: theme.global.current.value.dark ? '#000a' : '#fffc',
  textColor: theme.global.current.value.dark ? 'white' : 'black',
});

// 默认使用学生登录导航栏
let taskLink = ref("/task/taskflow");
let projectLink = ref("/project/board");
let notTeacher = ref(true);
if (user.priority !== -1) {
  data.userName = user.userName;
  data.userIcon = 'mdi-account-check-outline';
}
let userItems = ref([
  { title: '个人信息', url: '/info/profile' },
  { title: '我的小队', url: '/info/group' }
]);


// 老师--修改作业管理跳转，项目管理跳转以及修改用户登陆图标
if (user.priority === 1 || user.priority === 2) {
  taskLink = "/task/manage";
  projectLink = "/project/manage"
  data.userIcon = 'mdi-account-key-outline';
  userItems = [{ title: '个人信息', url: '/info/profile' }];
  notTeacher = false;
}

const toggleTheme = () => {
  data.themeIcon = theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night';
  data.bgColor = theme.global.current.value.dark ? '#fffc' : '#0003';
  data.textColor = theme.global.current.value.dark ? 'black' : 'white';
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>