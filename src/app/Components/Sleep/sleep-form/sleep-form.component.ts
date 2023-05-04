import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SleepService } from '../../../Services/sleep.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sleep-form',
  templateUrl: './sleep-form.component.html',
  styleUrls: ['./sleep-form.component.css']
})
export class SleepFormComponent {
  sleepForm!: FormGroup ; 
  
  constructor(private sleepService : SleepService,
              private router: Router){ }


  ngOnInit(){
    this.sleepForm = new FormGroup({
      start_time: new FormControl ('', [Validators.required]),
      end_time: new FormControl ('', [Validators.required])
    })
  }



  onSubmit(): void{

    const startTime = new Date();
    startTime.setHours(
      parseInt(this.sleepForm.value.start_time.split(':')[0]),
      parseInt(this.sleepForm.value.start_time.split(':')[1])
    );

    const endTime = new Date();
    endTime.setHours(
      parseInt(this.sleepForm.value.end_time.split(':')[0]),
      parseInt(this.sleepForm.value.end_time.split(':')[1])
    );

    const duration = (endTime.getTime() - startTime.getTime()) / 60000; // Duración en minutos


    //? Objeto para el back 
    const sleepObj = {
      id: 0,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      durationInMinutes: duration,
      date: new Date().toISOString()
    };

    this.sleepService.createSleeps(sleepObj).subscribe(data => {
      console.log('Lactancia guardada correctamente');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Toma Cargada correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then((result => {
        setTimeout(() => {
          this.router.navigate(['/breastfeeding-list'])
    
        }, 400)
      }))
    });

    this.sleepForm.reset();

  }
}
