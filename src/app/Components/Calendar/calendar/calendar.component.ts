import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from 'src/app/Services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarForm!: FormGroup;

  constructor(private calendarService: CalendarService){ }


  ngOnInit(){
    this.calendarForm = new FormGroup({
      title: new FormControl ('', [Validators.required]),
      description: new FormControl ('', [Validators.required]),
      time: new FormControl ('', [Validators.required]),
      date: new FormControl ('', [Validators.required])
    });
  }


  onSubmit(){

  }


}
