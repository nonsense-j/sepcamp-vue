<template>
  <v-app class="font-pFang">
    <v-app-bar elevation="0" density="comfortable" rounded='lg' class="main-bar mt-1" absolute>
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

    <v-main>
      <slot />
    </v-main>

  </v-app>

</template>
<style scoped>
@import "~/assets/css/customFonts.css";

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
</style>
<script setup>
import { useTheme } from 'vuetify'
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
  themeIcon: theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny',
  userIcon: 'mdi-account-question-outline',
  userName: '未登录',
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
  data.textColor = theme.global.current.value.dark ? 'black' : 'white';
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>