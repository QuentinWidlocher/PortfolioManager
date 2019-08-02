import { Component, Vue } from 'vue-property-decorator';
import { CardClass } from '@/classes/Card';
import Card from '@/components/Card/Card';

@Component({
    components: {
        Card
    },
})
export default class Home extends Vue {
    private card: CardClass = new CardClass('Test', 'El big testo', 'https://firebasestorage.googleapis.com/v0/b/portfolio-9b0b3.appspot.com/o/logo_small.webp?alt=media&token=4b6cb4d6-f7e5-4fa6-8c98-4358b498ddc6', 'google.fr', ['test 1', 'test 2', 'test 3'], '5b86e5', '36d1dc', 45);
}
