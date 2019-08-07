import { Component, Vue, Prop } from 'vue-property-decorator';
import { Project } from '@/classes/Project';

@Component
export default class Card extends Vue {
    @Prop() project: Project;
}
