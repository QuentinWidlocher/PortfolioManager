<template>
    <div id="Project">
        <v-container v-if="readyToDisplay" grid-list-lg>
            <v-layout wrap class="mt-2">

                <v-flex row xs12 class="mb-5">
                    <v-layout xs12 sm6 lg4 justify-center align-center class="mb-0">
                        <div class="picture" :style="{ '--gradientStart': gradientStart, '--gradientEnd': gradientEnd}">                            
                            <img :src="project.picture" width="200">
                        </div>
                    </v-layout>

                    <v-layout row xs12 md6 lg8 justify-space-around>
                        
                        <v-flex xs12>
                            <v-file-input 
                            class="file-input mt-0 pt-0"
                            accept="image/*"
                            :loading="fileUploading"
                            :success="fileUploaded"
                            prepend-icon="mdi-image"
                            label="Change picture"
                            @change="onFileChange"></v-file-input>
                        </v-flex>

                        <v-flex shrink>
                            <h3>Color A</h3>
                            <v-color-picker v-model="gradientStart"></v-color-picker>
                        </v-flex>
                        <v-flex shrink>
                            <h3>Color B</h3>
                            <v-color-picker v-model="gradientEnd"></v-color-picker>
                        </v-flex>
                    </v-layout>


                </v-flex>

                <v-flex xs12 sm6 md4>
                    <v-text-field
                        v-model="project.name"
                        label="Project name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field
                        v-model="project.description"
                        label="Description"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                    <v-text-field
                        v-model="project.link"
                        label="URL link"
                    ></v-text-field>
                </v-flex>

                <v-flex justify-end row>
                    
                    <v-dialog
                        max-width="600"
                        v-model="deleteDialog"
                    >
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-if="!createMode"
                                class="mr-auto"
                                text
                                color="error"
                                v-on="on"
                            >
                                Delete Project
                            </v-btn>
                        </template>

                        <v-alert
                            border="left"
                            colored-border
                            color="error"
                            icon="mdi-alert-circle"
                            prominent
                            class="mb-0"
                        >
                            <h3 class="headline">Warning !</h3>
                            <p>
                                You're about to delete the project named "{{project.name}}". <br>
                                This action is <b>IRREVERSIBLE</b> !<br>
                                Are you sure you want to delete the project named "{{project.name}}" ? <br>
                            </p>

                            <v-divider class="my-4 error"></v-divider>

                            <v-layout justify-end>
                                <v-btn
                                    class="mr-auto"
                                    color="error"
                                    rounded 
                                    text          
                                    @click="deleteProject"                     
                                >
                                    Delete the project
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    rounded  
                                    outlined     
                                    @click="deleteDialog = false"                 
                                >
                                    Cancel
                                </v-btn>
                            </v-layout>
                        </v-alert>
                    </v-dialog>
                    <v-btn
                        outlined
                        rounded
                        :color="'error'"
                        @click="cancel"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                    class="ml-2"
                        :color="'success'"
                        rounded
                        @click="saveProject"
                    >
                        <v-icon left>mdi-content-save</v-icon>
                        Save
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        

        <v-snackbar
            v-model="snackbar.visible"
            :color="snackbar.color"
        >
        {{ snackbar.text }}
        <v-btn
            dark
            text
            @click="snackbar.visible = false"
        >
            Close
        </v-btn>
        </v-snackbar>
    </div>
</template>
<script lang="ts" src="./Project.ts"></script>
<style lang="scss" scoped src="./Project.scss"></style>
