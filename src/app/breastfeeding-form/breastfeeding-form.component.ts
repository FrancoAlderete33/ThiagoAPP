import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-breastfeeding-form',
  templateUrl: './breastfeeding-form.component.html',
  styleUrls: ['./breastfeeding-form.component.css']
})
export class BreastfeedingFormComponent {
  breastfeedingForm!: FormGroup ; 
  
  constructor(){ }


  ngOnInit(){
    this.breastfeedingForm = new FormGroup({
      start_time: new FormControl ('', [Validators.required]),
      end_time: new FormControl ('', [Validators.required])
    })
  }



  onSubmit(){

  }
  
}
