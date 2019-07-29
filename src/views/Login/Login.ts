import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    private username: string = '';
    private password: string = '';
    private showPassword: boolean = false;
}
