import { Component, Input } from '@angular/core';
import { Card, CardModule } from 'primeng/card';

@Component({
  selector: 'actor-card',
  imports: [CardModule],
  templateUrl: './actor-card.component.html',
  styleUrl: './actor-card.component.scss'
})
export class ActorCardComponent {

  @Input() public title: string = '';                                                     // actor's name
  @Input() public imgSource: string = '';                                                 // actor's image
  @Input() public numericValue: number = NaN;                                             // birth year

}
