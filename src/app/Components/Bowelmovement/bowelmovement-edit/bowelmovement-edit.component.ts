import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BowelmovementService } from 'src/app/Services/bowelmovement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bowelmovement-edit',
  templateUrl: './bowelmovement-edit.component.html',
  styleUrls: ['./bowelmovement-edit.component.css']
})
export class BowelmovementEditComponent {
  bowelmovementId!: number;
  bowelmovementForm!: FormGroup;
  date!: string ; 

  constructor(
    private bowelmovementService: BowelmovementService,
    private route : Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.bowelmovementForm = new FormGroup({
      time: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID no encontrado en la URL ');
      return;
    }
  
    const bowelmovementId = parseInt(id, 10);
    this.bowelmovementId = bowelmovementId;
  
    this.bowelmovementService.getBowelMovementById(bowelmovementId).subscribe(
      (bowelmovement: any) => {
        const time = bowelmovement.time.split('T')[1].slice(0, 5); // extraer solo la parte de tiempo
        const type = bowelmovement.type
       
        this.date = bowelmovement.date
        this.bowelmovementForm.patchValue({
          time: time,
          type: type
        });
      },
      (error: any) => console.log(error)
    );

  }
  
  

  onSubmit(): void {
    const time = new Date();
    time.setHours(
      parseInt(this.bowelmovementForm.value.time.split(':')[0]),
      parseInt(this.bowelmovementForm.value.time.split(':')[1])
    );

    const type = this.bowelmovementForm.value.type
  
    const updatedBowelmovement = {
      id: this.bowelmovementId,
      time: time.toISOString(),
      type: type,
      date: this.date
    };
  
    this.bowelmovementService.updateBowelMovement(updatedBowelmovement).subscribe(
      () => {
        console.log('Control de heces actualizado');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Control de heces actualizado',
          showConfirmButton: false,
          timer: 1500
        }).then((result => {
          setTimeout(() => {
            this.route.navigate(['/bowelmovement-list']);
          }, 400);
        }));
      },
      (error: any) => {
        console.error(error);
      }
    );
  
    this.bowelmovementForm.reset();
  }

}
