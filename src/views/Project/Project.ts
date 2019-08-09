import { Component, Vue, Prop } from 'vue-property-decorator';
import { Project } from '@/classes/Project';
import { firebaseService } from '@/services/firebase';
import router from '@/router';

@Component({})
export default class ProjectView extends Vue {
    @Prop() projectID: string;
    project: Project;
    projectRef: firebase.firestore.DocumentReference;
    readyToDisplay: boolean = false;

    createMode: boolean;

    snackbar: any = {
        visible: false,
        text: '',
        color: 'primary',
        timeout: 2000,
    }

    private mounted() {
        this.createMode = (this.projectID === undefined);

        if (this.createMode) {
            this.project = <Project>{};
            this.readyToDisplay = true;
        } else {
            this.loadProject();
        }
    }

    private loadProject() {
        this.readyToDisplay = false;
        this.projectRef = firebaseService.db.collection('projects').doc(this.projectID)
        this.projectRef.get().then((snapshot: any) => {
            
            this.project = snapshot.data();

            if (!this.project) {
                router.push({ name: 'home' });
                return;
            }
            this.readyToDisplay = true;
        }).catch((error: any) => {
            router.push({ name: 'home' });
        });
    }

    private cancel() {
        router.push({ name: 'home' });
    }

    private save() {
        if (this.createMode) {
            this.createProject();
        } else {
            this.updateProject();
        }
    }

    private createProject() {
        firebaseService.db.collection('projects').add(this.project).then(() => {
            const message: string = `
                ${this.project.name} has been succesfully added !
                Return to home page in ${this.snackbar.timeout / 1000} seconds.
            `;

            this.snackbarShow(message, 'success').then(() => {
                router.push({ name: 'home' });
            });
        }).catch((error: any) => {
            this.snackbarShow(error, 'error');
        });
    }

    private updateProject() {
        this.projectRef.update(this.project).then(() => {

            const message: string = `
                ${this.project.name} has been succesfully edited !
                Return to home page in ${this.snackbar.timeout / 1000} seconds.
            `;

            this.snackbarShow(message, 'success').then(() => {
                router.push({ name: 'home' });
            });
        }).catch((error: any) => {
            this.snackbarShow(error, 'error');
        });
    }

    private snackbarShow(text: string, color: string = 'primary', timeout: number = this.snackbar.timeout): Promise<void> {
        this.snackbar.text = text;
        this.snackbar.color = color;
        this.snackbar.visible = true;

        return new Promise((rslv) => {
            setTimeout(() => {
                this.snackbar.visible = false;
                rslv();
            }, timeout);
        });
    }
}
