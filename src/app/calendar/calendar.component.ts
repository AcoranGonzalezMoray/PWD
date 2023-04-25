import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  selected: Date | null | undefined;
  @Output () valueResponse: EventEmitter< Date | null | undefined> = new EventEmitter();

  select(selected:Date) {
    this.valueResponse.emit(selected);
  }
}
