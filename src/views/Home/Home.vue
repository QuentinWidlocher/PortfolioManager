<template>
    <div id="Home">
        <Card :project="project" v-for="(project, index) in projects" v-bind:key="index"/>
    </div>
</template>
<script lang="ts" src="./Home.ts"></script>
<style lang="scss" scoped src="./Home.scss"></style>
