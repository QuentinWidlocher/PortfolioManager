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
        <v-container grid-list-lg>
            <v-layout wrap justify-center>
                <v-flex v-for="project in projects" :key="project.id" shrink>
                    <Card :project="project"/>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script lang="ts" src="./Home.ts"></script>
<style lang="scss" scoped src="./Home.scss"></style>
