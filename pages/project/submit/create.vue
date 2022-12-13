<template>
  <div class="d-flex flex-column">
    <div class="mx-auto">
      <v-btn elevation="4" class="text-btn" size="x-large" prepend-icon="mdi-swap-vertical-bold"
        append-icon="mdi-swap-vertical-bold" variant="outlined">
        创建新提交
      </v-btn>
    </div>
    <v-form v-model="valid" class="d-flex flex-column" lazy-validation>
      <v-text-field v-for="(question, index) in contents" :key="index" v-model="contents[index]" :rules="contentRules"
        :placeholder="question" density="comfortable" variant="outlined" color="primary" clearable>
      </v-text-field>
      <div class="item-length">
        <v-select prepend-icon="mdi-format-list-bulleted-type" variant="outlined" v-model="select" :items="taskTypes"
          :rules="[v => !!v || '作业类型必选']" placeholder="作业类型" density="compact" class="mr-5" required>
        </v-select>
      </div>
      <div>
        <v-btn class="mx-3" color="info" size="large" append-icon="mdi-plus-circle" rounded="lg"
          @click="contents.push('')">
          增加建议
        </v-btn>
        <v-btn class="mx-3" color="warning" size="large" append-icon="mdi-minus-circle" rounded="lg"
          @click="reduceQuest">
          减少建议
        </v-btn>
        <NuxtLink to="/task/manage" class=" text-decoration-none">
          <v-btn class="mx-3" color="primary" size="large" append-icon="mdi-arrow-right-drop-circle-outline"
            rounded="lg">
            发布作业
          </v-btn>
        </NuxtLink>
      </div>
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
  middleware: ["auth"]
});

const user = {
  userName: store().username,
  priority: store().priority,
  userID: store().userID,
  groupID: store().groupID,
}

const router = useRouter();
const backPage = () => {
  router.go(-1);
}

</script>
