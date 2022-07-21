import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { PostService } from '../services/post.service';
import { CreatePost } from '../model/Posts';
import { Actions, PostForm } from '../model/PostForm';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.page.html',
  styleUrls: ['./post-form.page.scss'],
})
export class PostFormPage implements OnInit {

  public titlePage: string = '';
  private action: Actions;
  public form: PostForm = { title: null, description: null, subtitle: null, image: null };
  private postId: any = null;
  public isUploading: boolean = false;
  private image: any = null;

  constructor(private postService: PostService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      this.postId = paramMap.get('postId');
      if (this.postId) {
        this.titlePage = 'Edit Post';
        this.action = Actions.update;
        this.getPostByIdAndAssign(this.postId);
      } else {
        this.titlePage = 'Create new Post';
        this.action = Actions.create;
      }
    });
  }

  private getPostByIdAndAssign(id: any) {
    this.postService.getPostById(id).subscribe(post => {
      this.form = post.attributes;
    });
  }

  public getPostImage() {
    if (this.form.image.data) {
      return this.postService.getImageFromPostByUrl(this.form.image.data.attributes.formats.small.url);
    }
    return 'assets/image-not-found.png';
  }

  public saveHandler(title: any, description: any, subtitle: any) {
    if (this.action === Actions.create) {
      this.savePost(title, description, subtitle)
    } else {
      this.updatePost(this.postId, title, description, subtitle);
    }
  }

  public savePost(title: any, description: any, subtitle: any) {
    this.uploadImage().pipe(switchMap((imageId) => {
      const post: CreatePost = { title: title.value, description: description.value, subtitle: subtitle.value, image: imageId };
      return this.postService.createPost(post);
    })).subscribe(postCreated => this.router.navigate(['/posts']));
  }

  public updatePost(id: number, title: any, description: any, subtitle: any) {
    const post: CreatePost = { title: title.value, description: description.value, subtitle: subtitle.value };
    this.postService.updatePost(id, post).subscribe(postCreated => this.router.navigate(['/posts']));
  }

  private uploadImage(): Observable<any> {
    return new Observable(observer => {
      this.isUploading = true;
      this.postService.uploadImage(this.image).subscribe(resp => {
        this.isUploading = false;
        observer.next(resp[0].id);
      }, err => {
        console.error(err);
      });
    })
  }

  public imageSelectedHandle(event) {
    this.image = event;
  }

  public isCreatingPost(): boolean {
    return this.action === Actions.create;
  }

  public stateChangeUploadingImage(state) {
    this.isUploading = state;
  }

  public get isFormValid(): boolean {
    return this.form.title && this.form.description && this.form.subtitle && this.image;
  }

}
