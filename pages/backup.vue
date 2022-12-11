<template>
  <div class="fixed-bg d-flex flex-column">
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
        <v-sheet width="60%" elevation="15" class="mx-auto rounded-lg d-flex justify-center flex-row">
          <div class="ma-3 w-50 px-4 d-flex flex-column justify-center">
            <v-form ref="form" v-model="valid" class="d-flex flex-column" lazy-validation>
              <v-text-field v-model="email" :rules="emailRules" label="账号（邮箱/用户名）"
                prepend-inner-icon="mdi-email-outline" density="comfortable" variant="outlined" color="primary"
                clearable>
              </v-text-field>

              <v-text-field label="输入密码" placeholder="密码只能由字母、数字组成且长度不小于8" clearable
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" color="primary" class=" my-5"
                :type="visible ? 'text' : 'password'" density="comfortable" v-model="password" :rules="passwordRules"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible">
              </v-text-field>

              <v-card class="mb-12" color="surface-variant" variant="tonal">
                <v-card-text class="text-medium-emphasis text-caption">
                  注意：登录时无法切换身份，会按照注册时选中的身份进行登录，未登录网站中大部分界面无法查看。
                </v-card-text>
              </v-card>

              <v-btn block color="primary" size="large" append-icon="mdi-login" rounded="lg" :loading="loading[1]"
                :disabled="loading[1]" @click="load(1)">
                登录
              </v-btn>
              <div class=" d-inline-flex justify-end mt-3">
                <v-btn color="info" variant="plain">
                  还没有账号？前往注册
                  <v-icon icon="mdi-chevron-right" end></v-icon>
                </v-btn>
              </div>
            </v-form>
          </div>
          <div class="ma-3 w-50 py-5 px-4 d-flex justify-center flex-row">
            <v-form ref="formRe" v-model="valid" class="d-flex flex-column flex-fill" lazy-validation>
              <v-text-field v-model="name" :rules="nameRules" label="用户名"
                prepend-inner-icon="mdi-account-circle-outline" density="comfortable" variant="outlined"
                color="secondary" class="text-body-2" clearable>
              </v-text-field>

              <v-text-field v-model="emailRe" :rules="emailRules" label="UCAS邮箱" prepend-inner-icon="mdi-email-outline"
                density="comfortable" variant="outlined" color="secondary" clearable>
              </v-text-field>

              <v-text-field label="输入新密码" placeholder="密码只能由字母、数字组成且长度不小于8" clearable
                :append-inner-icon="visibleRe ? 'mdi-eye-off' : 'mdi-eye'" color="secondary"
                :type="visibleRe ? 'text' : 'password'" density="comfortable" v-model="passwordRe"
                :rules="passwordRules" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visibleRe = !visibleRe">
              </v-text-field>

              <v-text-field label="重复一遍密码" placeholder="确保两次输入一致" clearable
                :append-inner-icon="visibleRe2 ? 'mdi-eye-off' : 'mdi-eye'" color="secondary"
                :type="visibleRe2 ? 'text' : 'password'" density="comfortable" v-model="repeatpw" :rules="repeatpwRules"
                prepend-inner-icon="mdi-lock-check-outline" variant="outlined"
                @click:append-inner="visibleRe2 = !visibleRe2">
              </v-text-field>

              <v-select prepend-icon="mdi-format-list-bulleted-type" variant="solo" v-model="select" :items="items"
                :rules="[v => !!v || 'Item is required']" placeholder="注册角色" density="compact" required
                class="mx-auto w-66 sec-border">
              </v-select>

              <v-btn block class="text-white" size="large" color="secondary" append-icon="mdi-account-plus" rounded="lg"
                :loading="loading[2]" :disabled="loading[2]" @click="load(2)">
                注册
              </v-btn>

              <div class=" d-inline-flex justify-end mt-3">
                <v-btn color="info" variant="plain">
                  已有账号？前往登录
                  <v-icon icon="mdi-chevron-right" end></v-icon>
                </v-btn>
              </div>

            </v-form>
          </div>
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
@import "~/assets/css/custom.css";

.purple-blue-bg {
  background: #7f7fd5;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, rgb(127, 127, 213), rgb(134, 168, 231), rgb(145, 234, 228));
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, rgb(127, 127, 213), rgb(134, 168, 231), rgb(145, 234, 228));
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.sepcamp-title {
  font-size: 2rem !important;
  letter-spacing: 0.1rem !important;
  text-transform: none !important;
  cursor: default;
}

.fixed-bg {
  background-image: url(~/assets/image/lightSky.jpg);
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
<script>
import { useTheme } from 'vuetify'

export default {
  data: () => ({
    loading: [],
    visible: false,
    visibleRe: false,
    visibleRe2: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '用户名不能为空',
      v => (v && v.length <= 10) || '用户名长度必须不超过10',
    ],
    email: '',
    emailRe: '',
    emailRules: [
      v => !!v || '邮箱地址不能为空',
      v => /^.+@mails\.ucas\.ac\.cn$/.test(v) || '必须使用有效的UCAS邮箱',
    ],
    password: '',
    passwordRe: '',
    passwordRules: [
      v => !!v || '密码不能为空',
      v => (v && v.length >= 8) || '密码长度必须不少于8',
      v => /(?=.*\d)(?=.*[A-z])[\da-zA-Z]+/.test(v) || '密码只能由字母、数字组成',
    ],
    repeatpw: '',
    repeatpwRules: [
      v => !!v || '密码不能为空',
      v => (v == this.$refs.formRe.passwordRe) || '两次输入密码需保持一致'
    ],
    select: null,
    items: [
      '学生',
      '助教',
      '教师'
    ]
  }),
  setup() {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) alert('Form is valid')
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    load(i) {
      this.loading[i] = true
      setTimeout(() => (this.loading[i] = false), 3000)
    },
  },
}
</script>