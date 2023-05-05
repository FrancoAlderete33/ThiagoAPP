import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SleepService } from 'src/app/Services/sleep.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sleep-edit',
  templateUrl: './sleep-edit.component.html',
  styleUrls: ['./sleep-edit.component.css']
})
export class SleepEditComponent {
  sleepForm!: FormGroup;
  sleepId!: number;
  date!: string ; 

  constructor(
    private sleepService: SleepService,
    private route : Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.sleepForm = new FormGroup({
      start_time: new FormControl('', [Validators.required]),
      end_time: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID no encontrado en la URL');
      return;
    }
  
    const sleepId = parseInt(id, 10);
    this.sleepId = sleepId;
  
    this.sleepService.getSleepById(sleepId).subscribe(
      (sleep: any) => {
        const startTime = sleep.start_time.split('T')[1].slice(0, 5); // extraer solo la parte de tiempo
        const endTime = sleep.end_time.split('T')[1].slice(0, 5);
        this.date = sleep.date
        this.sleepForm.patchValue({
          start_time: startTime,
          end_time: endTime
        });
      },
      (error: any) => console.log(error)
    );

  }
  
  

  onSubmit(): void {
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
  
    const updatedSleep = {
      id: this.sleepId,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      durationInMinutes: duration,
      date: this.date
    };
  
    this.sleepService.updateSleep(updatedSleep).subscribe(
      () => {
        console.log('Sueño actualizado correctamente');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sueño actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then((result => {
          setTimeout(() => {
            this.route.navigate(['/sleep-list']);
          }, 400);
        }));
      },
      (error: any) => {
        console.error(error);
      }
    );
  
    this.sleepForm.reset();
  }
  
}
