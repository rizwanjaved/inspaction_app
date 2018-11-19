import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListAppointmentsPage } from './list-appointments';

@NgModule({
  declarations: [
    ListAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListAppointmentsPage),
  ],
})
export class ListAppointmentsPageModule {}
