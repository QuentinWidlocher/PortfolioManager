import { Component, Vue, Prop } from 'vue-property-decorator';
import { Project } from '@/classes/Project';
import { firebaseService } from '@/services/firebase';
import router from '@/router';
import { VMenu } from 'vuetify/lib';

@Component({})
export default class ProjectView extends Vue {
    @Prop() projectID: string;
    project: Project;
    projectRef: firebase.firestore.DocumentReference;
    readyToDisplay: boolean = false;

    gradientStart: string = '#EDEDED';
    gradientEnd: string = '#EDEDED';
    gradientAngle: number = 180;

    tags: string[] = [];
    selectedTags: string[] = [];

    deleteDialog: boolean = false;

    createMode: boolean;
    fileUploading: boolean = false;
    fileUploaded: boolean = false;
    fileDownloaded: boolean = true;

    formValid: boolean = true;
    nameRules: any = [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length <= 16) || 'Name must be less than 16 characters'
    ]
    descriptionRules: any = [
        (v: string) => (v.length <= 20) || 'Description must be less than 20 characters'
    ]
    urlRules: any = [
        (v: string) => (!v || v.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) || 'Url is not valid',
    ]

    snackbar: any = {
        visible: false,
        text: '',
        color: 'primary',
        timeout: 2000,
    }

    $refs: any;

    private get middleColor(): string {
        var c = "#";
        for (var i = 0; i < 3; i++) {
            var sub1 = this.gradientStart.substring(1 + 2 * i, 3 + 2 * i);
            var sub2 = this.gradientEnd.substring(1 + 2 * i, 3 + 2 * i);
            var v1 = parseInt(sub1, 16);
            var v2 = parseInt(sub2, 16);
            var v = Math.floor((v1 + v2) / 2);
            var sub = v.toString(16).toUpperCase();
            var padsub = ('0' + sub).slice(-2);
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

            return (brightness > 140 ? "black" : "white")
        }
        return "black";
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
            this.gradientAngle = this.project.gradientAngle;
            this.tags = this.project.tags;
            this.selectedTags = this.tags;            

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

        if (!(this.$refs.form as any).validate() && !this.formValid) {
            this.snackbarShow('Some fields are not correctly filled', 'error');
            return;
        }

        if (this.fileUploading) {
            this.snackbarShow('Please wait before the picture is uploaded', 'error');
            return;
        }

        this.project.gradientStart = this.gradientStart.slice(1, 7);
        this.project.gradientEnd = this.gradientEnd.slice(1, 7);
        this.project.gradientAngle = this.gradientAngle;
        this.project.tags = this.tags;

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
        this.fileDownloaded = false;
        
        if (!file) return;
        
        this.fileUploading = true;
        firebaseService.storage.child(file.name).put(file).then((snapshot: any) => {
            console.log(snapshot);
            
            this.fileUploading = false;
            this.fileUploaded = true;

            return snapshot.ref.getDownloadURL();
        }).then((downloadURL: string) => {
            this.project.picture = downloadURL;
            this.fileDownloaded = true;
        });
    }
}
