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
        <v-container grid-list-lg v-if="!loadingProjects">
            <v-layout wrap justify-center>

                <v-flex shrink>
                    <router-link :to="{ name: 'project-add' }" class="add-card">
                        <v-layout column shrink justify-center class="add-card-text">
                            <v-icon size="100" color="black">mdi-plus-box</v-icon>
                            <h1>Add a project</h1>
                        </v-layout>
                    </router-link>
                </v-flex>

                <v-flex v-for="project in projects" :key="project.id" shrink>
                    <Card :project="project"/>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>
<script lang="ts" src="./Home.ts"></script>
<style lang="scss" scoped src="./Home.scss"></style>
