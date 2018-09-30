import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEtherPage } from './add-ether';

@NgModule({
  declarations: [
    AddEtherPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEtherPage),
  ],
})
export class AddEtherPageModule {}
