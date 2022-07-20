import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { PostService } from '../services/post.service';
import { PostDataRequest } from '../model/Posts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  public posts: PostDataRequest[] = [];
  public error: any = null;

  constructor(private postService: PostService, private alertController: AlertController) { }

  public ngOnInit() {
    this.getPosts();
  }

  public ionViewWillEnter() {
    this.getPosts();
  }

  private getPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    }, err => {
      console.error(err);
    })
  }

  public getPostImage(imageAttributes: any): string {
    if (imageAttributes) {
      return this.postService.getImageFromPostByUrl(imageAttributes.attributes.formats.small.url);
    }
    return 'assets/image-not-found.png';
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
