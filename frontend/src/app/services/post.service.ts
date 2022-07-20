import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PostRequest, PostDataRequest, CreatePost, SinglePostResponse } from '../model/Posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private serverApi: string;
  private server: string;

  constructor(private httpClient: HttpClient) {
    this.serverApi = environment.serverApi;
    this.server = environment.server;
  }

  public getPosts(): Observable<PostDataRequest[]> {
    return this.httpClient.get<PostRequest>(`${this.serverApi}/posts?populate=*`).pipe(switchMap((posts) => {
      return new Observable<PostDataRequest[]>((observer) => observer.next(posts.data));
    }));
  }

  public getImageFromPostByUrl(urlImage: string): string {
    return `${this.server}${urlImage}`;
  }

  public getPostById(id: number): Observable<PostDataRequest> {
    return this.httpClient.get<SinglePostResponse>(`${this.serverApi}/posts/${id}?populate=*`).pipe(switchMap((posts) => {
      return new Observable<PostDataRequest>((observer) => observer.next(posts.data));
    }));
  }

  public createPost(post: CreatePost): Observable<PostDataRequest> {
    const postDataRequest = { data: { ...post } };
    return this.httpClient.post<SinglePostResponse>(`${this.serverApi}/posts`, postDataRequest).pipe(switchMap((postCreated) => {
      return new Observable<PostDataRequest>((observer) => observer.next(postCreated.data));
    }));
  }

  public updatePost(id: number, post: CreatePost): Observable<PostDataRequest> {
    const postDataRequest = { data: { ...post } };
    return this.httpClient.put<SinglePostResponse>(`${this.serverApi}/posts/${id}`, postDataRequest).pipe(switchMap((postCreated) => {
      return new Observable<PostDataRequest>((observer) => observer.next(postCreated.data));
    }));
  }

  public removePostById(id: number): Observable<PostDataRequest> {
    return this.httpClient.delete<SinglePostResponse>(`${this.serverApi}/posts/${id}`).pipe(switchMap((postDeleted => {
      return new Observable<PostDataRequest>((observer) => observer.next(postDeleted.data));
    })));
  }

  public uploadImage(image: any): Observable<any> {
    const body = new FormData();
    body.append('files', image);
    return this.httpClient.post(`${this.serverApi}/upload`, body);
  }

}
