import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { ActorCardComponent } from "../../components/actor-card/actor-card.component";
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { BaseCard } from '../../types/BaseCard';

@Component({
  selector: 'shared-card-list',
  imports: [MovieCardComponent, ActorCardComponent, CommonModule, PaginatorModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public cards: BaseCard[] = [];                                                 // complete set of cards, from parent
  public displayedCards: BaseCard[] = [];                                                 // cards to display
  private observer: ResizeObserver | null = null;                                         // observer for resizing the screen
  public cardsPerPage: number = 3;                                                        // cards to display per page
  private firstIndex: number = 0;                                                         // current paginator state

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.setupResizeObserver();                                                           // set an observer to detect screen resizing
    this.updateCardsPerPage();                                                            // set the cards per page based on the screen size
    this.paginate({ first: this.firstIndex, rows: this.cardsPerPage });                   // set the paginator state
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['cards']) {                                                               // when cards changes, update the displayed cards
      this.paginate({ first: this.firstIndex, rows: this.cardsPerPage });
    }
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();                                                          // clean the observer
  }

  private setupResizeObserver(): void {
    this.observer = new ResizeObserver(() => {
      this.updateCardsPerPage();                                                          // update cards per page
      this.paginate({ first: this.firstIndex, rows: this.cardsPerPage });                 // update displayed cards based on new layout
      this.changeDetectorRef.detectChanges();                                             // trigger change detection
    });

    this.observer.observe(document.body);
  }

  private updateCardsPerPage(): void {
    const screenWidth = window.innerWidth;
    if (this.cards.length === 0) return;

    let columns = 3;
    let rowsPerPage = 2;

    if (screenWidth >= 1280) {
      columns = this.cards[0].type === 'movie' ? 8 : 6;                                   // xl screen
    } else if (screenWidth >= 1024) {
      columns = this.cards[0].type === 'movie' ? 7 : 5;                                   // lg screen
    } else if (screenWidth >= 768) {
      columns = this.cards[0].type === 'movie' ? 5 : 4;                                   // md screen
    } else {
      columns = this.cards[0].type === 'movie' ? 4 : 3;                                   // sm screen                                                                      // sm screen
    }

    const newcardsPerPage = columns * rowsPerPage;                                        // calculate new cards per page

    if (newcardsPerPage !== this.cardsPerPage) {
      this.cardsPerPage = newcardsPerPage;                                                // update cards per page
    }
  }

  public paginate(event: PaginatorState): void {
    this.firstIndex = event.first ?? 0;                                                   // ensure first is always a number
    const first = this.firstIndex;                                                        // index of first card on the page
    const rows = event.rows ?? this.cardsPerPage;                                         // ensure rows is always defined

    this.displayedCards = this.cards.slice(first, first + rows);                          // select subset

    this.changeDetectorRef.detectChanges();                                               // trigger change detection
  }
  
}
