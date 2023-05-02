import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreastfeedingFormComponent } from './breastfeeding-form/breastfeeding-form.component';
import { BreastfeedingListComponent } from './breastfeeding-list/breastfeeding-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'breastfeeding-form'},
  {path: 'breastfeeding-form', component: BreastfeedingFormComponent},
  {path: 'breastfeeding-list', component: BreastfeedingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
