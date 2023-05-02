import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreastfeedingFormComponent } from './breastfeeding-form/breastfeeding-form.component';
import { BreastfeedingListComponent } from './breastfeeding-list/breastfeeding-list.component';




@NgModule({
  declarations: [
    AppComponent,
    BreastfeedingFormComponent,
    BreastfeedingListComponent
  
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
