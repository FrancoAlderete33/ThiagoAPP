import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreastfeedingFormComponent } from './breastfeeding-form/breastfeeding-form.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'breastfeeding-form'},
  {path: 'breastfeeding-form', component: BreastfeedingFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
