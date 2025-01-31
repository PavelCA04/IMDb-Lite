import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  @Input() public id: string = '';                                                        // movie's id
  @Input() public title: string = '';                                                     // movie's title
  @Input() public imgSource: string = '';                                                 // movie's poster
  @Input() public numericValue: number = NaN;                                             // movie's year of release

  constructor(private router: Router) { }

  public navigateToMovie() : void {
    this.router.navigate(['/movies', this.id]);
  }
}
