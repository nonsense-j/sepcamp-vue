<template>
  <div class="d-flex flex-column">
    <v-sheet class="mx-auto" rounded>
      <v-btn elevation="4" class="text-btn" size="x-large" prepend-icon="mdi-swap-vertical-bold"
        append-icon="mdi-swap-vertical-bold" variant="outlined">
        创建新提交
      </v-btn>
    </v-sheet>
    <v-form v-model="valid" lazy-validation>
      <v-sheet min-width="400px" class="pa-3 mx-auto mt-5 w-66" rounded="lg" elevation="6">
        <v-container>
          <div class="d-flex flex-row align-start mt-3">
            <div class="head-tab text-no-wrap mt-4 mr-4">材料上传:</div>
            <v-file-input v-model="files" :rules="notNullRules" color="primary" counter label="文档" multiple
              placeholder="点击选择你要上传的文档材料" prepend-icon="mdi-paperclip" variant="outlined" :show-size="1000"
              accept=".doc,.docx,.pdf">
              <template v-slot:selection="{ fileNames }">
                <template v-for="(fileName, index) in fileNames" :key="fileName">
                  <v-chip color="primary" label size="small" class="mr-2">
                    <v-icon icon="mdi-file-document-outline" class="mr-1" />
                    {{ fileName }}
                  </v-chip>
                </template>
              </template>
            </v-file-input>
          </div>
          <div class="d-flex flex-row align-start mt-3">
            <div class="head-tab text-no-wrap mt-2 mr-4">说明信息:</div>
            <div class="sub-tab flex-fill">
              <v-textarea density="compact" v-model="record.msg" :rules="notNullRules" variant="outlined">
              </v-textarea>
            </div>
          </div>
        </v-container>
        <div class="d-flex flex-row mb-4 mb-3 justify-space-around">
          <v-btn color="primary" append-icon="mdi-close-circle-outline" rounded="lg" @click="backPage()">
            取消编辑
          </v-btn>
          <!-- TODO: -->
          <!-- 点击提交信息回到小组信息页并且刷新 -->
          <v-btn color="primary" append-icon="mdi-arrow-right-drop-circle-outline" rounded="lg" @click="submit()">
            提交信息
          </v-btn>
        </div>
      </v-sheet>
    </v-form>
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

.text-btn {
  cursor: default;
  text-transform: none;
}
</style>

<script setup>
import { store } from "~/store/store"

definePageMeta({
  layout: "content",
  middleware: ["auth", "sameuid"]
});

const valid = ref(false);

// TODO:
// record接口，要提交的数据类型
const record = {
  msg: ""
}
// 文件存在这个里面
const files = ref([])
const notNullRules = reactive([v => !!v || '内容不能为空']);


const router = useRouter();
const route = useRoute();
const backPage = () => {
  router.go(-1);
}
// TODO:
// files names urls还有时间
const submit = () => {
  if (files && record.msg) {
    let flow = route.query.flow == 0 ? 'openflow' : 'endflow';
    router.push(`/project/submit/${flow}?id=${route.query.id}`);
  }
}

</script>
