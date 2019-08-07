<template>
  <v-app>
    <v-app-bar app color="primary" dark>

      <v-app-bar-nav-icon>
        <v-icon>mdi-image-filter-none</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <span> Portfolio Manager</span>
      </v-toolbar-title>
    </v-app-bar>
    
    <v-content id="MainPage">
      <router-view/>
    </v-content>
    
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
}
</script>

<style lang="scss" scoped>
#MainPage {
  width: 100vw;
  height: calc(100vh - 4rem);
  overflow: hidden;

  > * > * {
    width: 100%;
    height: 100%;
    display: flex;
  }
}
</style>

