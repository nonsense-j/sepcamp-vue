<template>
  <div class="fixed-bg font-pFang d-flex flex-column" :style="{ backgroundImage: `url(${data.bgImage})` }">
    <div class="surface d-flex flex-column align-center">
      <div id="login-content" class="w-100">
        <div class="d-flex flex-column align-center">
          <v-sheet class="rounded-lg px-6 py-1 elevation-15 sepcamp-title" @click="toggleTheme">
            SEPCAMP
          </v-sheet>
        </div>
        <div class="w-100 my-3">
          <v-divider length="10%" class="mx-auto"></v-divider>
        </div>
        <v-sheet width="50%" min-width="300px" elevation="15" class="mx-auto rounded-lg d-flex justify-center flex-row">
          <slot />
        </v-sheet>
      </div>
      <div class="w-100 mt-10 mb-6">
        <v-divider length="20%" class="mx-auto"></v-divider>
      </div>
      <div id="login-footer flex-fill" class="d-flex justify-center my-auto">
        <v-btn class="mb-6" prepend-icon="mdi-home">
          <NuxtLink class="text-decoration-none font-weight-bold" to="/">返回主页</NuxtLink>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "~/assets/css/customFonts.css";

.sepcamp-title {
  font-size: 2rem !important;
  letter-spacing: 0.1rem !important;
  text-transform: none !important;
  cursor: default;
}

.fixed-bg {
  /* background-image: url(~/assets/image/lightSky.jpg); */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
}


.h-40 {
  height: 40vh !important;
}

.surface {
  position: relative;
  margin-top: 10vh;
}
</style>
<script setup>
import { useTheme } from 'vuetify'
import lightImg from '~/assets/image/lightSky.jpg'
import darkImg from '~/assets/image/darkPlanet.jpg'


const theme = useTheme();
let data = reactive({ bgImage: theme.global.current.value.dark ? darkImg : lightImg, });

const toggleTheme = () => {
  data.bgImage = theme.global.current.value.dark ? lightImg : darkImg;
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>