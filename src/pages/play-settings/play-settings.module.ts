import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaySettingsPage } from './play-settings';

@NgModule({
  declarations: [
    PlaySettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaySettingsPage),
  ],
})
export class PlaySettingsPageModule {}
