import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreastfeedingService } from '../Services/breastfeeding.service';

@Component({
  selector: 'app-breastfeeding-form',
  templateUrl: './breastfeeding-form.component.html',
  styleUrls: ['./breastfeeding-form.component.css']
})
export class BreastfeedingFormComponent {
  breastfeedingForm!: FormGroup ; 
  
  constructor(private breasFeedingService : BreastfeedingService){ }


  ngOnInit(){
    this.breastfeedingForm = new FormGroup({
      start_time: new FormControl ('', [Validators.required]),
      end_time: new FormControl ('', [Validators.required])
    })
  }



  onSubmit(): void{

    const startTime = new Date();
    startTime.setHours(
      parseInt(this.breastfeedingForm.value.start_time.split(':')[0]),
      parseInt(this.breastfeedingForm.value.start_time.split(':')[1])
    );

    const endTime = new Date();
    endTime.setHours(
      parseInt(this.breastfeedingForm.value.end_time.split(':')[0]),
      parseInt(this.breastfeedingForm.value.end_time.split(':')[1])
    );

    const duration = (endTime.getTime() - startTime.getTime()) / 60000; // Duración en minutos


    //? Objeto para el back 
    const breastfeeding = {
      id: 0,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      durationInMinutes: duration,
      date: new Date().toISOString()
    };

    this.breasFeedingService.createBreastfeeding(breastfeeding).subscribe(data => {
      console.log('Lactancia Guardada Correctamente');
    });

    this.breastfeedingForm.reset();

  }
  
}
