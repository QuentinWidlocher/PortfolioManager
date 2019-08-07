<template>
    <a href="" class="card">
        <div class="card__gradient"
            :style="`
                background: #${project.gradientStart};
                background: -moz-linear-gradient(${project.gradientAngle}deg, #${project.gradientStart} 0%, #${project.gradientEnd} 100%);
                background: -webkit-linear-gradient(${project.gradientAngle}deg, #${project.gradientStart} 0%, #${project.gradientEnd} 100%);
                background: linear-gradient(${project.gradientAngle}deg, #${project.gradientStart} 0%, #${project.gradientEnd} 100%);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#${project.gradientStart}', endColorstr='#${project.gradientEnd}', GradientType=1);`"
        >
            <img class="card_image" :src="project.picture" :alt="`${project.name} Logo`" width="200">
        </div>
        <div class="card__info">
            <div class="card__title">
                <h3>{{project.name}}</h3>
                <span>{{project.description}}</span>
            </div>
            <div class="card__badges">
                <span v-for="(tag, index) in project.tags" v-bind:key="index" class="card__badge" :style="`background-color: #${project.gradientEnd}7F;`">{{tag}}</span>
            </div>
        </div>
    </a>
</template>
<script lang="ts" src="./Card.ts"></script>
<style lang="scss" scoped src="./Card.scss"></style>