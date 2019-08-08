import { Component, Vue } from 'vue-property-decorator';
import { firebaseService } from '@/services/firebase';
import router from '@/router';

@Component({})
export default class Login extends Vue {
    private username: string = '';
    private password: string = '';
    private showPassword: boolean = false;

    private loading: boolean = false;

    private errorMessage: string = '';

    private login() {
        this.loading = true;

        firebaseService.auth.signInWithEmailAndPassword(this.username, this.password)
        .then(() => {
            router.push({name: "home"})
        }).catch((error: any) => {
            this.loading = false;
            this.errorMessage = error.message;
        });
    }
}
