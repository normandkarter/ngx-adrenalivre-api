import { Author } from '../author';
import { Visit } from "./visit";

export class AuthorVisit extends Visit {

    public discriminator: string = 'author';

    public author: Author;

    hydrate(data: any) {
        if (data.author) {
            if (this.author instanceof Author) {
                this.author.hydrate(data.author);
            } else {
                this.author = new Author(data.author);
            }
        }

        return super.hydrate(data);
    }
}