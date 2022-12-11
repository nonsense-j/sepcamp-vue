<template>
  <div class="d-flex flex-column justify-center">
    <v-btn elevation="2" width="30%" variant="outlined" size="x-large" class="mx-auto mb-5" prepend-icon="mdi-calendar">
      <v-icon icon="mdi-circle-small" />
      {{ $route.query.date }}
      <v-icon icon="mdi-circle-small" />
      {{ typeNames[$route.query.type] }}
    </v-btn>
  </div>
</template>
<script setup>
const typeColors = { 1: "cyan", 2: "amber" };
const typeNames = { 1: "课堂作业", 2: "课后作业" };
</script>