import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostFormPageRoutingModule } from './post-form-routing.module';

import { PostFormPage } from './post-form.page';
import { InputFileComponent } from '../common/input-file/input-file.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostFormPageRoutingModule
  ],
  declarations: [PostFormPage, InputFileComponent],
})
export class PostFormPageModule {}
