import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { ActorCardComponent } from "../../components/actor-card/actor-card.component";
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BaseCard } from '../../types/BaseCard';

@Component({
  selector: 'shared-card-list',
  imports: [MovieCardComponent, ActorCardComponent, CommonModule, TableModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnChanges {

  @Input() public cards: BaseCard[] = [];                                                 // receive the cards 
  public groupedCards: BaseCard[][] = [];                                                 // store cards after grouping according to type

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cards']) {
      this.groupCards();
    }
  }

  private groupCards(): void {
    this.groupedCards = [];                                                               // reset

    if (this.cards.length === 0) return;

    const groupSize = this.cards[0].type === 'movie' ? 8 : 6;                             // determine type

    for (let i = 0; i < this.cards.length; i += groupSize) {                              // group cards dynamically
      this.groupedCards.push(this.cards.slice(i, i + groupSize));
    }
  }
}
