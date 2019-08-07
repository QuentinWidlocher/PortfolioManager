import { Component, Vue } from 'vue-property-decorator';
import { Project } from '@/classes/Project';
import Card from '@/components/Card/Card';
import { firebaseService } from '@/services/firebase';

@Component({
    components: {
        Card
    },
})
export default class Home extends Vue {
    private projects: Project[] = [];

    private mounted() {
        this.loadProjects();
    }

    private loadProjects() {
        firebaseService.db.collection('projects').get().then((snapshot: any) => {
            snapshot.forEach((doc: any) => {                
                this.projects.push(doc.data());
            });
        });
    }
}
