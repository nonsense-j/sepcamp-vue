<template>
  <header>
    <div class="d-flex align-center flex-column">
      <v-icon icon="mdi-home" />
      <v-card class="my-3 py-3" width="400" variant="tonal">
        <nav class="d-flex align-center flex-column">
          <ul>
            <li>
              <NuxtLink to="/posts">Posts合集</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/posts/1">Post 1</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/posts/2">Post 2</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/posts/child">其它子文章</NuxtLink>
            </li>
          </ul>
        </nav>
      </v-card>
      <div id="main-footer" class="d-flex flex-row">
        <v-btn class="my-3 mx-10">
          <NuxtLink class="text-decoration-none font-weight-bold" to="/about">About</NuxtLink>
        </v-btn>
        <v-btn class="my-3 mx-10">
          <NuxtLink class="text-decoration-none font-weight-bold" to="/login">Login</NuxtLink>
        </v-btn>
      </div>

    </div>
  </header>
</template>