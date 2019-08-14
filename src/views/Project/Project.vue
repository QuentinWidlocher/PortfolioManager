<template>
    <div id="Project">
        <v-form ref="form" v-model="formValid">
            <v-container class="px-5" v-if="readyToDisplay">
                <v-row >
                    <v-col sm="12" lg="4" >
                        <v-row justify="center">
                            <div id="picture" class="picture" :style="{ '--gradientAngle': gradientAngle + 'deg', '--gradientStart': gradientStart, '--gradientEnd': gradientEnd}">                            
                                <img v-if="fileDownloaded" :src="project.picture" width="200">
                                <v-progress-circular
                                    v-if="!fileDownloaded"
                                    size="100"
                                    color="primary"
                                    indeterminate
                                ></v-progress-circular>
                            </div>
                        </v-row>
                    </v-col>
                    <v-col sm="12" lg="8">
                        <v-row id="picture-input">
                            <v-file-input 
                                class="file-input mt-0 pt-0"
                                accept="image/*"
                                :loading="fileUploading"
                                :success="fileUploaded"
                                prepend-icon="mdi-image"
                                label="Change picture"
                                @change="onFileChange"></v-file-input>
                        </v-row>
                        <v-row id="gradient-input">
                            <v-col cols="12" sm="6" md="4" xl="3" align-self="center">
                                    <span class="subtitle-1">Gradient Start</span>
                                    <v-color-picker class="ma-auto" v-model="gradientStart" mode="hexa"></v-color-picker>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" xl="3">
                                    <span class="subtitle-1">Gradient End</span>
                                    <v-color-picker class="ma-auto" v-model="gradientEnd" mode="hexa"></v-color-picker>
                            </v-col>
                            <v-col cols="12" md="4" xl="6">
                                <span class="subtitle-1">Gradient Angle</span>
                                <v-slider
                                    class="mt-5"
                                    v-model="gradientAngle"
                                    min="0"
                                    max="360"
                                    step="5"
                                    thumb-label
                                    prepend-icon="mdi-rotate-left"
                                    append-icon="mdi-rotate-right"
                                    @click:prepend="gradientAngle += -45"
                                    @click:append="gradientAngle += 45"
                                ></v-slider>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row id="text-fields">
                    <v-col cols="12" sm="6" lg="4">
                        <v-text-field
                            v-model="project.name"
                            label="Project name"
                            :rules="nameRules"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="4">
                        <v-text-field
                            v-model="project.description"
                            label="Description"
                            :rules="descriptionRules"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field
                            v-model="project.link"
                            label="URL link"
                            :rules="urlRules"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-combobox
                            v-model="tags"
                            :items="tags"
                            append-icon=""
                            color="primary"
                            chips
                            deletable-chips
                            multiple
                            hide-selected
                            label="Tags"
                        >
                            <template v-slot:selection="{ attrs, item, parent, selected }">
                                <v-chip
                                    :color="middleColor"
                                    :dark="textColor != 'black'"
                                >
                                    <span class="pr-2">
                                        {{ item }}
                                    </span>
                                    <v-icon
                                        small
                                        @click="parent.selectItem(item)"
                                    >mdi-close</v-icon>
                                </v-chip>
                            </template>
                        </v-combobox>
                    </v-col>
                </v-row>
                <v-row id="buttons" class="pb-5" justify="end">
                    <v-dialog
                        max-width="600"
                        v-model="deleteDialog"
                    >
                        <template v-slot:activator="{ on }">
                            <v-col cols="12" md="auto" v-if="!createMode" class="mr-auto">
                                <v-btn
                                    block
                                    rounded
                                    text
                                    color="error"
                                    v-on="on"
                                >
                                    Delete Project
                                </v-btn>
                            </v-col>
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
                    <v-col cols="12" md="auto">
                        <v-btn
                            block
                            outlined
                            rounded
                            color="error"
                            @click="cancel"
                        >
                            Cancel
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="auto">
                        <v-btn
                            block
                            color="success"
                            rounded
                            @click="saveProject"
                        >
                            <v-icon left>mdi-content-save</v-icon>
                            Save
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>    
        </v-form>        

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
