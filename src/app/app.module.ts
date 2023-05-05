import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreastfeedingFormComponent } from './Components/Breastfeeding/breastfeeding-form/breastfeeding-form.component';
import { BreastfeedingListComponent } from './Components/Breastfeeding/breastfeeding-list/breastfeeding-list.component';
import { SleepFormComponent } from './Components/Sleep/sleep-form/sleep-form.component';
import { SleepListComponent } from './Components/Sleep/sleep-list/sleep-list.component';
import { BreastfeedingEditComponent } from './Components/Breastfeeding/breastfeeding-edit/breastfeeding-edit.component';
import { SleepEditComponent } from './Components/Sleep/sleep-edit/sleep-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    BreastfeedingFormComponent,
    BreastfeedingListComponent,
    SleepFormComponent,
    SleepListComponent,
    BreastfeedingEditComponent,
    SleepEditComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
