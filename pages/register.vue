<template>
  <div class="mt-5 w-85 py-5 px-4 d-flex justify-center flex-row">
    <v-form ref="formRe" v-model="valid" class="d-flex flex-column flex-fill" lazy-validation>
      <v-text-field v-model="name" :rules="nameRules" label="用户名" prepend-inner-icon="mdi-account-circle-outline"
        density="comfortable" variant="outlined" color="secondary" class="text-body-2 mb-2" clearable>
      </v-text-field>

      <v-text-field v-model="emailRe" :rules="emailRules" label="UCAS邮箱" prepend-inner-icon="mdi-email-outline"
        density="comfortable" variant="outlined" color="secondary" class="mb-2" clearable>
      </v-text-field>

      <v-text-field label="输入新密码" placeholder="密码必须由字母、数字组成且长度不小于8" clearable
        :append-inner-icon="visibleRe ? 'mdi-eye-off' : 'mdi-eye'" color="secondary" class="mb-2"
        :type="visibleRe ? 'text' : 'password'" density="comfortable" v-model="newPassword" :rules="passwordRules"
        prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visibleRe = !visibleRe">
      </v-text-field>

      <v-text-field label="重复一遍密码" placeholder="确保两次输入一致" class="mb-1" clearable
        :append-inner-icon="visibleRe2 ? 'mdi-eye-off' : 'mdi-eye'" color="secondary"
        :type="visibleRe2 ? 'text' : 'password'" density="comfortable" v-model="confirmPassword"
        :rules="[confirmPasswordRules, notNullRule]" prepend-inner-icon="mdi-lock-check-outline" variant="outlined"
        @click:append-inner="visibleRe2 = !visibleRe2">
      </v-text-field>

      <v-select prepend-icon="mdi-format-list-bulleted-type" variant="solo" v-model="select" :items="items"
        :rules="[v => !!v || '需要选择你的课程角色']" placeholder="课程角色" density="compact" required
        class="mx-auto w-75 sec-border">
      </v-select>

      <v-btn block class="text-white" size="large" color="secondary" append-icon="mdi-account-plus" rounded="lg"
        :loading="loading[2]" :disabled="loading[2]" @click="register">
        注册
      </v-btn>

      <div class=" d-inline-flex justify-end mt-2">
        <v-btn color="info" variant="plain">
          <NuxtLink class="text-decoration-none" to="/login">
            已有账号？前往登录
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
import {store} from "~/store/store";

definePageMeta({
  layout: "entrance",
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});
export default {
  data: () => ({
    loading: [],
    visibleRe: false,
    visibleRe2: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '用户名不能为空',
      v => (v && v.length <= 10) || '用户名长度必须不超过10',
    ],
    emailRe: '',
    emailRules: [
      v => !!v || '邮箱地址不能为空',
      v => /^.+@mails\.ucas\.ac\.cn$/.test(v) || '必须使用有效的UCAS邮箱',
    ],
    newPassword: '',
    passwordRules: [
      v => !!v || '密码不能为空',
      v => (v && v.length >= 8) || '密码长度必须不少于8',
      v => /(?=.*\d)(?=.*[A-z])[\da-zA-Z]+/.test(v) || '密码包含且只包含字母、数字',
    ],
    confirmPassword: '',
    notNullRule: [
      v => !!v || '密码不能为空'
    ],
    select: null,
    items: [
      '学生',
      '助教',
      '教师'
    ],
    rsa_pub_key: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfUL4XUO6v0vaWQ8GfSWvwSgTO\n' +
        '6wXUBdHyTXXKGirCZ/r/isdfQqwkK1urDE2M2s+YAJYhLCrjf6nACejc8Rhx0UJ9\n' +
        '9e9MKehfFkUA1MzvlG+Azu4tBzxjO04u6iLe+p+kOXMouH3nTmgWY7/4s2d85uxz\n' +
        'PxO26t2eZb9qJRmatQIDAQAB'
  }),
  methods: {
    register() {
      this.loading[2] = true
      const global_store = store();
      let priority = this.select === this.items[2] ? 2 : this.select === this.items[1] ? 1 : 0
      let user = {
        username: this.name,
        email: this.emailRe,
        password: this.$encrypt(this.newPassword, this.rsa_pub_key),
        site_url: global_store.serverURL,
        priority: priority
      }
      axios.post(global_store.serverURL + "register", user)
          .then(response => {
            console.log(response.data)
            if(response.status === 200) {
              // TODO: deal with login success
              let result = response.data
              if(result.success === true) {
                this.loading[2] = false
                alert('注册成功！请前往邮箱进行验证')
                this.$router.push('/login')
              }
              else {
                this.loading[2] = false
                alert('注册失败，'+ result.message)
              }
            }
            else {
              // TODO: deal with other response code
              this.loading[2] = false
              console.log(response)
            }
          })
          .catch(error => {
            // TODO: deal with error
            this.loading[2] = false
            console.error(error)
          })
    },
    load(i) {
      this.loading[i] = true
      setTimeout(() => (this.loading[i] = false), 3000)
    },
  },
  computed: {
    confirmPasswordRules() {
      return () => (this.newPassword === this.confirmPassword) || "两次输入密码需要一致"
    },
  }
}
</script>