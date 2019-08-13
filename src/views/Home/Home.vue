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
            <v-row justify="center">

                <v-col cols="12" md="6" lg="4" xl="3">
                    <router-link :to="{ name: 'project-add' }" class="add-card ma-auto">
                        <v-layout column shrink justify-center class="add-card-text">
                            <v-icon size="100" color="black">mdi-plus-box</v-icon>
                            <h1>Add a project</h1>
                        </v-layout>
                    </router-link>
                </v-col>

                <v-col cols="12" md="6" lg="4" xl="3" v-for="project in projects" :key="project.id">
                    <Card :project="project" class="ma-auto"/>
                </v-col>

            </v-row>
        </v-container>
    </div>
</template>
<script lang="ts" src="./Home.ts"></script>
<style lang="scss" scoped src="./Home.scss"></style>
