<template>
  <div class=" mt-10 w-85 py-8 px-4 d-flex flex-column justify-center">
    <v-form ref="form" v-model="valid" class="d-flex flex-column" lazy-validation>
      <v-text-field v-model="email" :rules="emailRules" label="账号（UCAS邮箱）" prepend-inner-icon="mdi-email-outline"
        density="comfortable" variant="outlined" color="primary" clearable>
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
        :disabled="loading[1]" @click="login">
        登录
      </v-btn>
      <div class=" d-inline-flex justify-end mt-2">
        <v-btn color="info" variant="plain">
          <NuxtLink class="text-decoration-none" to="/register">
            还没有账号？前往注册
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </NuxtLink>

        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<style scoped>
.w-85 {
  width: 85%;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
<script>
import axios from "axios";

definePageMeta({
  layout: "entrance",
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
})

export default {
  data: () => ({
    loading: [],
    visible: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || '邮箱地址不能为空',
      v => /^.+@mails\.ucas\.ac\.cn$/.test(v) || '必须使用有效的UCAS邮箱',
    ],
    password: '',
    passwordRules: [
      v => !!v || '密码不能为空',
      v => (v && v.length >= 8) || '密码长度必须不少于8',
      v => /(?=.*\d)(?=.*[A-z])[\da-zA-Z]+/.test(v) || '密码只能由字母、数字组成',
    ],
    rsa_pub_key: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfUL4XUO6v0vaWQ8GfSWvwSgTO\n' +
        '6wXUBdHyTXXKGirCZ/r/isdfQqwkK1urDE2M2s+YAJYhLCrjf6nACejc8Rhx0UJ9\n' +
        '9e9MKehfFkUA1MzvlG+Azu4tBzxjO04u6iLe+p+kOXMouH3nTmgWY7/4s2d85uxz\n' +
        'PxO26t2eZb9qJRmatQIDAQAB',
    serverURL: 'http://localhost:8080/'
  }),
  methods: {
    // async validate() {
    //   const { valid } = await this.$refs.form.validate()

    //   if (valid) alert('Form is valid')
    // },
    // reset() {
    //   this.$refs.form.reset()
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation()
    // },
    load(i) {
      this.loading[i] = true
      setTimeout(() => (this.loading[i] = false), 3000)
    },
    login() {
      let user = new FormData()
      user.append('username', this.email)
      user.append('password', this.$encrypt(this.password, this.rsa_pub_key))
      axios.post(this.serverURL + "dologin", user)
          .then(response => {
            if(response.status === 200) {
              // TODO: deal with login success
              console.log(response)
            }
            else {
              // TODO: deal with other response code
              console.log(response)
            }
          })
          .catch(error => {
            // TODO: deal with error
            console.error(error)
          })
    }
  },
}

</script>