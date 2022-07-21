import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { PostService } from '../services/post.service';
import { PostData, PostDataRequest } from '../model/Posts';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  public posts: PostData[] = [];
  public error: any = null;

  constructor(private postService: PostService, private alertController: AlertController) { }

  public ngOnInit() {
    this.getPosts();
  }

  public ionViewWillEnter() {
    this.getPosts();
  }

  private getPosts() {
    this.postService.getPosts().pipe(switchMap((posts) => {
      return new Observable<PostData[]>(observer => {
        const postsWithSrcImage: PostData[] = posts.map(post => {
          const { id, attributes } = post;
          const { description, title, image, subtitle } = attributes;
          const dataImage = post.attributes.image.data;
          const srcImage = dataImage ? this.postService.getImageFromPostByUrl(dataImage.attributes.formats.small.url) :
            'assets/image-not-found.png';
          return {
            id, attributes: {
              description, title, image, subtitle, srcImage
            }
          }
        })
        observer.next(postsWithSrcImage);
      })
    })).subscribe(posts => this.posts = posts);
  }

  public getPostImage(imageAttributes: any): any {
    if (imageAttributes) {
      this.postService.getImageFromPostByUrl(imageAttributes.attributes.formats.small.url);
      // return this.postService.getImageFromPostByUrl(imageAttributes.attributes.formats.small.url);
    }
    // return 'assets/image-not-found.png';
  }

  public async deletePostById(id: number) {
    const alert = await this.alertController.create({
      header: 'Remove',
      subHeader: 'Remove this post',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => { this.deletePostRequest(id); }
        }
      ]
    });
    await alert.present();
  }

  private deletePostRequest(id: number) {
    this.postService.removePostById(id).subscribe(postDeleted => {
      const index = this.posts.findIndex(post => post.id === postDeleted.id);
      this.posts.splice(index, 1);
    });
  }

}
