import { File } from '../file';

export class Slide {
    public id: string;
    public title: string;
    public position: number;
    public backgroundImageFile: File;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);

        if (data.file) {
            if (this.backgroundImageFile instanceof File) {
                this.backgroundImageFile.hydrate(data.file);
            } else {
                this.backgroundImageFile = new File(data.file);
            }
        }

        return this;
    }
}
