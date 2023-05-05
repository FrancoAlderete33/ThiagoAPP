import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BowelmovementService } from 'src/app/Services/bowelmovement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bowelmovement-form',
  templateUrl: './bowelmovement-form.component.html',
  styleUrls: ['./bowelmovement-form.component.css']
})
export class BowelmovementFormComponent {
  bowelmovementForm!: FormGroup;


  constructor(private bowelMovementService: BowelmovementService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.bowelmovementForm = new FormGroup({
      time: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    })
  }



  onSubmit(): void {

    const time = new Date();
    time.setHours(
      parseInt(this.bowelmovementForm.value.time.split(':')[0]),
      parseInt(this.bowelmovementForm.value.time.split(':')[1])
    );

    const type = this.bowelmovementForm.value.type

    //? Objeto para el back 
    const bowelmovement = {
      id: 0,
      time: time.toISOString(),
      type: type,
      date: new Date().toISOString()
    };

    this.bowelMovementService.createBowelMovement(bowelmovement).subscribe(data => {
      console.log('Control de heces guardado correctamente');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Control de heces guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then((result => {
        setTimeout(() => {
          this.router.navigate(['/bowelmovement-list'])

        }, 400)
      }))
    });

    this.bowelmovementForm.reset();

  }
}
