export interface PostRequest {
    data: PostDataRequest[];
}

export interface SinglePostResponse {
    data: PostDataRequest;
}

export interface PostDataRequest {
    id: number;
    attributes: {
        title: string;
        description: string;
        subtitle: string;
        image: any;
    }
}

export interface CreatePost {
    title: string;
    description: string;
    subtitle: string;
    image?: string
}