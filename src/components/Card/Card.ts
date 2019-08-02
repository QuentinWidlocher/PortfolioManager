import { Component, Vue, Prop } from 'vue-property-decorator';
import { CardClass } from '@/classes/Card';

@Component
export default class Card extends Vue {
    @Prop() card: CardClass;
}
