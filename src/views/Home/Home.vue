<template>
    <div id="Home">
        <v-progress-circular
            :width="5"
            :size="100"
            class="ma-auto"
            color="primary"
            indeterminate
            v-if="loadingProjects"
        ></v-progress-circular>
        <Card :project="project" v-for="(project, index) in projects" v-bind:key="index"/>
    </div>
</template>
<script lang="ts" src="./Home.ts"></script>
<style lang="scss" scoped src="./Home.scss"></style>
