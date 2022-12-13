<template>
  <div class="d-flex flex-column">
    <div class="mx-auto">
      <v-btn elevation="4" class="text-btn" size="x-large" prepend-icon="mdi-swap-vertical-bold"
        append-icon="mdi-swap-vertical-bold" color="red-lighten-1">
        创建新回复
      </v-btn>
    </div>
    <v-form v-model="valid" lazy-validation>
      <v-sheet min-width="400px" class="pa-3 mx-auto mt-5 w-66" rounded="lg" elevation="6">
        <div class="px-4 pt-3">
          <v-textarea v-for="(advice, index) in advices" :key="index" v-model="advices[index]" :rules="notNullRules"
            density="comfortable" variant="outlined" clearable rows="2">
          </v-textarea>
        </div>
        <div v-if="isRouterAlive" class="d-flex my-3 flex-row justify-center">
          <div class=" w-33">
            <v-slider v-model="score"></v-slider>
          </div>
          <div class=" mx-2 text-h5 text-primary">{{ Math.trunc(score) }}</div>
        </div>
        <div class="mb-5">
          <v-btn class="mx-4" color="info" variant="outlined" append-icon="mdi-plus-circle" rounded="lg"
            @click="advices.push('')">
            增加建议
          </v-btn>
          <v-btn class="mx-4" color="warning" variant="outlined" append-icon="mdi-minus-circle" rounded="lg"
            @click="reduceAdvice()">
            减少建议
          </v-btn>
        </div>
        <div class="d-flex flex-row mb-4 mb-3 justify-space-around">
          <v-btn color="red-lighten-1" append-icon="mdi-close-circle-outline" rounded="lg" @click="backPage()">
            取消编辑
          </v-btn>
          <!-- TODO: -->
          <!-- 点击提交信息回到小组信息页并且刷新 -->
          <v-btn color="red-lighten-1" append-icon="mdi-arrow-right-drop-circle-outline" rounded="lg" @click="submit()">
            提交建议
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

definePageMeta({
  layout: "content",
  middleware: ["auth", "onlyadmin"]
});

const valid = ref(false);

// TODO:
// advices接口，要提交的数据类型
const advices = reactive([""])

const notNullRules = reactive([v => !!v || '内容不能为空']);


const router = useRouter();
const route = useRoute();
const backPage = () => {
  router.go(-1);
}
const reduceAdvice = () => {
  if (advices.length > 1)
    advices.pop()
}
// TODO:
// files names urls还有时间
const submit = () => {
  let flow = route.query.flow == 0 ? 'openflow' : 'endflow';
  router.push(`/project/submit/${flow}?id=${route.query.id}`);
}

</script>
