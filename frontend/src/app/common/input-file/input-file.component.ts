import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-input-file',
  template: `<ion-item>
  <ion-input #media type="file" [id]="inputId" (change)="imageHandler($event)"></ion-input>
  <label [for]="inputId" icon-only ion-button>
    <ion-icon name="camera"></ion-icon>
  </label>
  </ion-item>`
})
export class InputFileComponent {

  @Input() inputId = '';
  @Output() onChangeImage = new EventEmitter<number>();

  constructor(private postService: PostService) {
  }

  public imageHandler(event) {
    const fileChoose = event.target.files[0];
    this.onChangeImage.emit(fileChoose);
  }

}
