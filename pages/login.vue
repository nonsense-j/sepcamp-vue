<template>
  <div class="h-screen">
    <div class="purple-blue-bg h-30"></div>
    <div id="login-content" class="w-100 h-55">
      <v-sheet width="60%" height="100%" elevation="15" color="#f6f5f7"
        class="mx-auto mt-n15 rounded-lg d-flex justify-center flex-row">
        <div class="ma-3 w-50 px-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="email" :rules="emailRules" label="账号（邮箱/用户名）" prepend-inner-icon="mdi-email-outline"
              density="comfortable" variant="outlined" color="primary" class=" mt-10" clearable>
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

            <v-btn block class="mb-8" color="blue" size="large" variant="tonal">
              登录
            </v-btn>
          </v-form>
        </div>
        <div class="ma-3 flex-fill ">
          <v-form ref="formRe" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :rules="nameRules" label="用户名" prepend-inner-icon="mdi-account-circle"
              density="comfortable" variant="outlined" color="secondary" class="text-body-2" clearable>
            </v-text-field>

            <v-text-field v-model="emailRe" :rules="emailRules" label="UCAS邮箱" prepend-inner-icon="mdi-email-outline"
              density="comfortable" variant="outlined" color="secondary" clearable>
            </v-text-field>

            <v-text-field label="输入新密码" placeholder="密码只能由字母、数字组成且长度不小于8" clearable
              :append-inner-icon="visibleRe ? 'mdi-eye-off' : 'mdi-eye'" color="secondary"
              :type="visibleRe ? 'text' : 'password'" density="comfortable" v-model="passwordRe" :rules="passwordRules"
              prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visibleRe = !visibleRe">
            </v-text-field>

            <v-text-field label="重复一遍密码" placeholder="确保两次输入一致" clearable
              :append-inner-icon="visibleRe2 ? 'mdi-eye-off' : 'mdi-eye'" color="secondary"
              :type="visibleRe2 ? 'text' : 'password'" density="comfortable" v-model="repeatpw" :rules="repeatpwRules"
              prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visibleRe2 = !visibleRe2">
            </v-text-field>

            <v-select variant="outlined" v-model="select" :items="items" :rules="[v => !!v || 'Item is required']"
              label="身份" density="compact" color="secondary" required>
            </v-select>

            <v-btn block class="mb-8" color="secondary" size="large" variant="tonal">
              注册
            </v-btn>

          </v-form>
        </div>
      </v-sheet>
    </div>
    <v-divider length="20%" class="mx-auto mt-15"></v-divider>
    <div id="login-footer" class="d-flex justify-center">
      <v-btn class="my-3 mt-10" prepend-icon="mdi-home">
        <NuxtLink class="text-decoration-none font-weight-bold" to="/">返回主页</NuxtLink>
      </v-btn>
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

.h-30 {
  height: 30% !important;
}

.h-55 {
  height: 55% !important;
}
</style>
<script>
export default {
  data: () => ({
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
  },
}
</script>