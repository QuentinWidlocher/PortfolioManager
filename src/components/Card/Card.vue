<template>
    <a href="" class="card">
        <div class="card__gradient"
            :style="`
                background: #${card.gradientStart};
                background: -moz-linear-gradient(${card.gradientAngle}deg, #${card.gradientStart} 0%, #${card.gradientEnd} 100%);
                background: -webkit-linear-gradient(${card.gradientAngle}deg, #${card.gradientStart} 0%, #${card.gradientEnd} 100%);
                background: linear-gradient(${card.gradientAngle}deg, #${card.gradientStart} 0%, #${card.gradientEnd} 100%);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#${card.gradientStart}', endColorstr='#${card.gradientEnd}', GradientType=1);`"
        >
            <img class="card_image" :src="card.picture" :alt="`${card.name} Logo`" width="200">
        </div>
        <div class="card__info">
            <div class="card__title">
                <h3>{{card.name}}</h3>
                <span>{{card.description}}</span>
            </div>
            <div class="card__badges">
                <span v-for="(tag, index) in card.tags" v-bind:key="index" class="card__badge" :style="`background-color: #${card.gradientEnd}7F;`">{{tag}}</span>
            </div>
        </div>
    </a>
</template>
<script lang="ts" src="./Card.ts"></script>
<style lang="scss" scoped src="./Card.scss"></style>