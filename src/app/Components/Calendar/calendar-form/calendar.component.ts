import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/Services/calendar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarForm!: FormGroup;

  constructor(private calendarService: CalendarService,
              private router: Router){ }


  ngOnInit(){
    this.calendarForm = new FormGroup({
      title: new FormControl ('', [Validators.required]),
      description: new FormControl ('', [Validators.required]),
      time: new FormControl ('', [Validators.required]),
      date: new FormControl ('', [Validators.required])
    });
  }

  onSubmit(): void{

    const timeEvent = new Date();
    timeEvent.setHours(
      parseInt(this.calendarForm.value.time.split(':')[0]),
      parseInt(this.calendarForm.value.time.split(':')[1])
    );

    const title = this.calendarForm.value.title;
    const description = this.calendarForm.value.description;

    //? Objeto para el back 
    const event = {
      id: 0,
      title: title,
      description: description,
      timeEventStart: timeEvent.toISOString(),
      date: new Date().toISOString()
    };

    this.calendarService.createEvent(event).subscribe(data => {
      console.log('Evento guardado correctamente');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Evento Cargado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then((result => {
        setTimeout(() => {
          this.router.navigate(['/events-list'])

        }, 400)
      }))
    });

    this.calendarForm.reset();

  }


}
