export interface PostForm {
    title: string;
    description: string;
    subtitle: string;
    image: any;
}

export enum Actions {
    create,
    update
}