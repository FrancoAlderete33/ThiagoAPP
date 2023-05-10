import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreastfeedingFormComponent } from './Components/Breastfeeding/breastfeeding-form/breastfeeding-form.component';
import { BreastfeedingListComponent } from './Components/Breastfeeding/breastfeeding-list/breastfeeding-list.component';
import { SleepFormComponent } from './Components/Sleep/sleep-form/sleep-form.component';
import { SleepListComponent } from './Components/Sleep/sleep-list/sleep-list.component';
import { BreastfeedingEditComponent } from './Components/Breastfeeding/breastfeeding-edit/breastfeeding-edit.component';
import { SleepEditComponent } from './Components/Sleep/sleep-edit/sleep-edit.component';
import { BowelmovementFormComponent } from './Components/Bowelmovement/bowelmovement-form/bowelmovement-form.component';
import { BowelmovementListComponent } from './Components/Bowelmovement/bowelmovement-list/bowelmovement-list.component';
import { BowelmovementEditComponent } from './Components/Bowelmovement/bowelmovement-edit/bowelmovement-edit.component';
import { CalendarComponent } from './Components/Calendar/calendar/calendar.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'breastfeeding-form'},
  {path: 'events', component: CalendarComponent},
  {path: 'sleep-form', component: SleepFormComponent},
  {path: 'sleep-list', component: SleepListComponent },
  {path: 'sleep/edit/:id', component: SleepEditComponent },
  {path: 'breastfeeding-form', component: BreastfeedingFormComponent},
  {path: 'breastfeeding-list', component: BreastfeedingListComponent },
  {path: 'breastfeeding/edit/:id', component: BreastfeedingEditComponent },
  {path: 'bowelmovement-form', component: BowelmovementFormComponent },
  {path: 'bowelmovement-list', component: BowelmovementListComponent },
  {path: 'bowelmovement/edit/:id', component: BowelmovementEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
