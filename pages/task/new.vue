<template>
  <v-sheet class="mx-auto blur main-sheet mt-3 mb-6 pa-4 d-flex flex-column pb-8" rounded="lg" elevation="6">
    <div class="mx-auto mb-5">
      <v-btn elevation="2" variant="outlined" size="x-large" prepend-icon="mdi-calendar">
        <v-icon icon="mdi-circle-small" />
        发布新作业
        <v-icon icon="mdi-circle-small" />
      </v-btn>
    </div>
    <div class="mx-auto">
      <v-divider length="30%"></v-divider>
    </div>
    <div class="my-auto">
      <div class="d-flex flex-row align-start px-10 justify-center">
        <div class="text-h5 font-weight-bold text-no-wrap">
          问题管理
        </div>
        <v-divider vertical class="mx-5" />
        <div class="w-100">
          <v-form v-model="valid" class="d-flex flex-column" lazy-validation>
            <v-text-field v-for="(question, index) in contents" :key="index" v-model="contents[index]"
              :rules="contentRules" :placeholder="question" density="comfortable" variant="outlined" color="primary"
              clearable>
            </v-text-field>
            <div class="item-length">
              <v-select prepend-icon="mdi-format-list-bulleted-type" variant="outlined" v-model="select"
                :items="taskTypes" :rules="[v => !!v || '作业类型必选']" placeholder="作业类型" density="compact" class="mr-5"
                required>
              </v-select>
            </div>
            <div class="d-flex flex-row date-length">
              <v-text-field v-model="selectDate" :rules="contentRules" density="compact" variant="outlined"
                prepend-icon="mdi-calendar" placeholder="点击右侧日期选择器选择作业对应的课程时间" disabled>
              </v-text-field>
              <Datepicker v-model="fullSelectDate" class="mx-2 w-25" :format="dateFormat"> </Datepicker>
            </div>
            <div class="d-flex flex-row date-length">
              <v-text-field v-model="expireDate" :rules="contentRules" density="compact" variant="outlined"
                prepend-icon="mdi-calendar-clock" placeholder="点击右侧日期选择器选择作业截止时间" disabled>
              </v-text-field>
              <Datepicker v-model="fullExpireDate" class="mx-2 w-25" :format="dateFormat"> </Datepicker>
            </div>
            <div>
              <v-btn class="mx-3" color="info" size="large" append-icon="mdi-plus-circle" rounded="lg"
                @click="contents.push('')">
                增加问题
              </v-btn>
              <v-btn class="mx-3" color="warning" size="large" append-icon="mdi-minus-circle" rounded="lg"
                @click="reduceQuest">
                减少问题
              </v-btn>
              <v-btn class="mx-3" color="primary" size="large" append-icon="mdi-arrow-right-drop-circle-outline"
                rounded="lg" @click="createTask">
                发布作业
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </v-sheet>
</template>
<style scoped>
.blur {
  -webkit-backdrop-filter: saturate(150%) blur(30px);
  backdrop-filter: saturate(150%) blur(30px);
}

.text-btn {
  cursor: default;
}

.item-length {
  min-width: 200px;
  max-width: 300px;
}

.date-length {
  width: 550px;
}

.main-sheet {
  min-height: 80vh;
  width: 96%;
}
</style>
<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import {store} from "~/store/store";
import axios from "axios";

const valid = ref(true);
const contents = reactive(['',]);
const contentRules = reactive([v => !!v || '问题内容不能为空']);

const reduceQuest = () => {
  if (contents.length > 1) {
    contents.pop();
  }
};

// date picker
const fullSelectDate = ref();
const fullExpireDate = ref();
let selectDate = ref();
let expireDate = ref();
const select = ref();
const taskTypes = ["课堂作业", "课后作业"];
watch(fullSelectDate, (newValue, oldValue) => {
  const year = newValue.getFullYear().toString();
  const month = (newValue.getMonth() + 1).toString().padStart(2, '0');
  const day = newValue.getDate().toString().padStart(2, '0');
  selectDate = year + month + day;
  expireDate =  year + "-" + month + "-" + day;
});
watch(fullExpireDate, (newValue, oldValue) => {
  const year = newValue.getFullYear().toString();
  const month = (newValue.getMonth() + 1).toString().padStart(2, '0');
  const day = newValue.getDate().toString().padStart(2, '0');
  expireDate = year + month + day;
});
const dateFormat = (date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return year + month + day;
}
const router = useRouter()

const createTask = () => {
  let startDate = fullSelectDate.value
  let endDate = fullExpireDate.value
  if(typeof startDate === 'undefined') {
    alert('请先选择开始日期')
    return
  }
  if(typeof endDate === 'undefined') {
    alert('请先选择结束日期')
  }
  const global_store = store()
  let DescribeText = contents.join("\u0001")
  let homeworkType = select.value === '课堂作业' ? 2 : 1
  let task = {
    describe_Text: DescribeText,
    start_Time: startDate.valueOf(),
    end_Time: endDate.valueOf(),
    term: '20222',
    homework_Type: homeworkType
  }

  axios.defaults.headers['authorization'] = global_store.token;
  axios.post(global_store.serverURL + "homework/create", task)
      .then(response => {
        if(response.status === 200) {
          // TODO: deal with  success
          let result = response.data
          if(result.success === true) {
            // login success
            alert('作业添加成功')
            router.go(-1)
          }
          else {
            alert(result.message)
          }
        } else {
          console.log(response)
        }
      })
      .catch(error => {
        console.error(error)
      })
}
</script>
