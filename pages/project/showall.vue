<template>
  <v-sheet>
    <v-container>
      <div class="d-flex flex-row flex-wrap justify-center">
        <v-card v-for="(project, index) in Projects" :key="index" height="170" width="80%" elevation="6"
                class="mb-3 mx-3">
          <v-card-title class="bg-teal"></v-card-title>
          <v-card-item class="py-1">
            <div>
              <div class="text-overline mb-1">
                {{ project.project_name }}
              </div>
              <div class="d-flex flex-column">
                  <div class="text-caption">
                    <v-icon icon="mdi-account-cog-outline" class="mr-1" />队长：{{ project.team_leader }}
                    <v-spacer></v-spacer>
                    <v-icon icon="mdi-account-group-outline" class="mr-1" />成员数量：{{ project.team_members }}/3
                  </div>
                  <div class="text-caption">
                    <v-icon icon="mdi-clipboard-text" class="mr-1" />{{ project.introduction }}
                  </div>
              </div>
            </div>
          </v-card-item>
          <v-card-actions class="py-0">
            <!-- TODO: -->
            <NuxtLink :to="``"
                      class=" text-decoration-none">
              <v-btn color="teal" variant="text" density="comfortable" prepend-icon="mdi-chevron-double-right">
                查看详情
              </v-btn>
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-sheet>
</template>
<script setup>
import axios from "axios";
import {store} from "~/store/store";

const Projects = reactive([{
  project_name: 'test',
  team_leader: 'admin',
  introduction: 'this is an introduction',
  team_members: 3,
  team_id: 0
}])

const global_store = store()

axios.defaults.headers['authorization'] = global_store.token
axios.post(global_store.serverURL)
</script>
<script>
definePageMeta({
  layout: "content",
})
</script>