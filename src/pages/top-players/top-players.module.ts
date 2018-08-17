import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPlayersPage } from './top-players';

@NgModule({
  declarations: [
    TopPlayersPage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlayersPage),
  ],
})
export class TopPlayersPageModule {}
