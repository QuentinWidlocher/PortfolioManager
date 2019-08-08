export class Project {
    public id: string;
    public name: string;
    public description: string;
    public picture: string;
    public link: string;
    public tags: string[];
    public gradientStart: string;
    public gradientEnd: string;
    public gradientAngle: number;

    public constructor( id: string, name: string, description: string, picture: string, link: string, tags: string[],
                        gradientStart: string, gradientEnd: string, gradientAngle: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.link = link;
        this.tags = tags;
        this.gradientStart = gradientStart;
        this.gradientEnd = gradientEnd;
        this.gradientAngle = gradientAngle;
    }
}