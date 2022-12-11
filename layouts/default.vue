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

    <v-main>
      <v-sheet class="mx-auto blur main-sheet mt-3 pa-4" rounded="lg" elevation="6">
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

.main-sheet {
  width: 96%;
  margin-top: -30vh;
  min-height: 400px;
}
</style>
<script setup>
import { useTheme } from 'vuetify'

// 用户接口
const user = {
  userName: "Aurora",
  priority: 0,
}

const theme = useTheme();
let data = reactive({
  themeIcon: theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny',
  userIcon: 'mdi-account-question-outline',
  userName: '未登录',
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
  data.themeIcon = theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night';
  data.textColor = theme.global.current.value.dark ? 'black' : 'white';
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>