import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreastfeedingFormComponent } from './Components/Breastfeeding/breastfeeding-form/breastfeeding-form.component';
import { BreastfeedingListComponent } from './Components/Breastfeeding/breastfeeding-list/breastfeeding-list.component';
import { SleepFormComponent } from './Components/Sleep/sleep-form/sleep-form.component';
import { SleepListComponent } from './Components/Sleep/sleep-list/sleep-list.component';
import { BreastfeedingEditComponent } from './Components/Breastfeeding/breastfeeding-edit/breastfeeding-edit.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'breastfeeding-form'},
  {path: 'sleep-form', component: SleepFormComponent},
  {path: 'sleep-list', component: SleepListComponent },
  {path: 'breastfeeding-form', component: BreastfeedingFormComponent},
  {path: 'breastfeeding-list', component: BreastfeedingListComponent },
  {path: 'breastfeeding/edit/:id', component: BreastfeedingEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
