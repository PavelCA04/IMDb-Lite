import { Component, Input } from '@angular/core';

@Component({
  selector: 'movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  @Input() public title: string = '';                                                     // movie's title
  @Input() public imgSource: string = '';                                                 // movie's poster
  @Input() public numericValue: number = NaN;                                             // movie's year of release

}
