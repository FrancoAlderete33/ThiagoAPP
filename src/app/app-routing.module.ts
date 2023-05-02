import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreastfeedingFormComponent } from './breastfeeding-form/breastfeeding-form.component';
import { BreastfeedingListComponent } from './breastfeeding-list/breastfeeding-list.component';
import { SleepFormComponent } from './sleep-form/sleep-form.component';
import { SleepListComponent } from './sleep-list/sleep-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'breastfeeding-form'},
  {path: 'sleep-form', component: SleepFormComponent},
  {path: 'sleep-list', component: SleepListComponent },
  {path: 'breastfeeding-form', component: BreastfeedingFormComponent},
  {path: 'breastfeeding-list', component: BreastfeedingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
