<template>
    <router-link :to="{ name: 'project', params: { projectID: project.id }}" class="card">
        <div class="card__gradient"
            :style="`--gradientAngle: ${project.gradientAngle}deg; --gradientStart: #${project.gradientStart}; --gradientEnd: #${project.gradientEnd}`"
        >
            <img class="card_image" :src="project.picture" :alt="`${project.name} Logo`" width="200">
        </div>
        <div class="card__info">
            <div class="card__title">
                <h3>{{project.name}}</h3>
                <span>{{project.description}}</span>
            </div>
            <div class="card__badges">
                <div v-for="(tag, index) in project.tags" v-bind:key="index" class="card__badge" :style="`background-color: #${project.gradientEnd}7F;`">{{tag}}</div>
            </div>
        </div>
    </router-link>
</template>
<script lang="ts" src="./Card.ts"></script>
<style lang="scss" scoped src="./Card.scss"></style>