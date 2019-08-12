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

    gradientStart: string = '#000000';
    gradientEnd: string = '#000000';

    deleteDialog: boolean = false;

    createMode: boolean;
    fileUploading: boolean = false;
    fileUploaded: boolean = false;

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
            this.gradientStart = this.project.gradientStart;
            this.gradientEnd = this.project.gradientEnd;

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

    private saveProject() {

        if (this.fileUploading) {
            this.snackbarShow('Please wait before the picture is uploaded', 'error');
            return;
        }

        this.project.gradientStart = this.gradientStart.slice(1, 7);
        this.project.gradientEnd = this.gradientEnd.slice(1, 7);

        if (this.createMode) {
            this.createProject();
        } else {
            this.updateProject();
        }
    }

    private deleteProject() {
        if (this.createMode) return;

        this.deleteDialog = false;

        this.projectRef.delete().then(() => {

            const message: string = `
                ${this.project.name} has been succesfully deleted !
                Return to home page in ${this.snackbar.timeout / 1000} seconds.
            `;

            this.snackbarShow(message, 'error').then(() => {
                router.push({ name: 'home' });
            });
        }).catch((error: any) => {
            this.snackbarShow(error, 'error');
        });
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

    private onFileChange(file: any) {
        this.fileUploading = false;
        this.fileUploaded = false;
        
        if (!file) return;
        
        this.fileUploading = true;
        firebaseService.storage.child(file.name).put(file).then((snapshot: any) => {
            console.log(snapshot);
            
            this.fileUploading = false;
            this.fileUploaded = true;

            return snapshot.ref.getDownloadURL();
        }).then((downloadURL: string) => {
            this.project.picture = downloadURL;
        });
    }
}
