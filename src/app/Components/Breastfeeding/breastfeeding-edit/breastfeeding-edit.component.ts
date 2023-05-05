import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreastfeedingService } from 'src/app/Services/breastfeeding.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-breastfeeding-edit',
  templateUrl: './breastfeeding-edit.component.html',
  styleUrls: ['./breastfeeding-edit.component.css']
})
export class BreastfeedingEditComponent {
  breastfeedingId!: number;
  breastfeedingForm!: FormGroup;
  date!: string ; 

  constructor(
    private breastfeedingService: BreastfeedingService,
    private route : Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.breastfeedingForm = new FormGroup({
      start_time: new FormControl('', [Validators.required]),
      end_time: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID no encontrado en la URL ');
      return;
    }
  
    const breastfeedingId = parseInt(id, 10);
    this.breastfeedingId = breastfeedingId;
  
    this.breastfeedingService.getBreastfeedingById(breastfeedingId).subscribe(
      (breastfeeding: any) => {
        const startTime = breastfeeding.start_time.split('T')[1].slice(0, 5); // extraer solo la parte de tiempo
        const endTime = breastfeeding.end_time.split('T')[1].slice(0, 5);
        this.date = breastfeeding.date
        this.breastfeedingForm.patchValue({
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
      parseInt(this.breastfeedingForm.value.start_time.split(':')[0]),
      parseInt(this.breastfeedingForm.value.start_time.split(':')[1])
    );
  
    const endTime = new Date();
    endTime.setHours(
      parseInt(this.breastfeedingForm.value.end_time.split(':')[0]),
      parseInt(this.breastfeedingForm.value.end_time.split(':')[1])
    );
  
    const duration = (endTime.getTime() - startTime.getTime()) / 60000; // Duración en minutos
  
    const updatedBreastfeeding = {
      id: this.breastfeedingId,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      durationInMinutes: duration,
      date: this.date
    };
  
    this.breastfeedingService.updateBreastfeeding(updatedBreastfeeding).subscribe(
      () => {
        console.log('Lactancia actualizada correctamente');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Lactancia actualizada correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then((result => {
          setTimeout(() => {
            this.route.navigate(['/breastfeeding-list']);
          }, 400);
        }));
      },
      (error) => {
        console.error(error);
      }
    );
  
    this.breastfeedingForm.reset();
  }
  

}

