import { Component, Vue, Prop } from 'vue-property-decorator';
import { Project } from '@/classes/Project';

@Component({})
export default class Card extends Vue {
    @Prop() project: Project;

    private get middleColor(): string {
        let c = "#";
        for (let i = 0; i < 3; i++) {
            let sub1 = ("#" + this.project.gradientStart).substring(1 + 2 * i, 3 + 2 * i);
            let sub2 = ("#" + this.project.gradientEnd).substring(1 + 2 * i, 3 + 2 * i);
            let v1 = parseInt(sub1, 16);
            let v2 = parseInt(sub2, 16);
            let v = Math.floor((v1 + v2) / 2);
            let sub = v.toString(16).toUpperCase();
            let padsub = ('0' + sub).slice(-2);
            c += padsub;
        }
        return c;
    }

    private get textColor() {
        let middleColor = this.middleColor;
        let m = middleColor.substr(1).match(middleColor.length == 7 ? /(\S{2})/g : /(\S{1})/g);
        if (m) {
            let r = parseInt(m[0], 16), g = parseInt(m[1], 16), b = parseInt(m[2], 16);
            let brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;

            return (brightness > 150 ? "black" : "white")
        }
        return "black";
    }
}
