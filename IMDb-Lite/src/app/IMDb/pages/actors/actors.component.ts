import { Component } from '@angular/core';
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { CardListComponent } from "../../shared/card-list/card-list.component";
import { BaseCard } from '../../types/BaseCard';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IMDbService } from '../../services/imdb.service';
import { Actor, ActorSearchParams } from '../../interfaces/imdb.interfaces';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-actors',
  imports: [
    MainHeaderComponent, 
    CardListComponent, 
    DatePickerModule, 
    ButtonModule, 
    SelectModule, 
    InputTextModule, 
    FloatLabelModule, 
    CommonModule, 
    FormsModule, 
    RouterModule,
    PaginatorModule
  ],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})
export class ActorsComponent {

  public actors: Actor[] = [];

  private searchParams: ActorSearchParams = {};

  public totalActors = 120;
  public pagination = 18;

  constructor(
    private imdbService: IMDbService
  ) { }

  cards: BaseCard[] = [
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'actor' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'actor' },
  ];

  // Filter options
  orderOptions = [
    { label: 'A-Z', value: 'asc' },
    { label: 'Z-A', value: 'desc' },
  ];

  // Model variables
  selectedOrder: string | null = null;
  selectedYear: Date | null = null;
  minYear: Date = new Date(1950, 0, 1);                                                   // January 1, 1900
  maxYear: Date = new Date();                                                             // Current Date
  searchQuery: string = '';

  filteredCards: BaseCard[] = [...this.cards];

  // Event handlers
  onOrderChange(event: any) {
    this.selectedOrder = event.value;
    this.applyFilters();
  }

  onYearSelect(event: any) {
    if (event) {
      this.selectedYear = event;
      this.applyFilters();
    }
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.cards];

    // Apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter((card) =>
        card.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (this.selectedYear) {
      const selectedYear = this.selectedYear.getFullYear();                               // Extract year from Date
      filtered = filtered.filter((card) => card.numericValue === selectedYear);
    }

    // Apply order filter
    if (this.selectedOrder === 'asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.selectedOrder === 'desc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    this.filteredCards = filtered;
  }

  getActors(): void {
    this.imdbService.getActors(this.searchParams).subscribe((response: any) => {
      const newCards: BaseCard[] = response.actors.map((actor: any) => ({
        id: actor._id,
        title: actor.name,
        imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg",
        numericValue: actor.birth_date.split('-')[0],
        type: 'actor'
      }));
      this.cards = newCards;

      this.totalActors = response.totalActors;
      this.pagination = response.limit;          
    });
  }

  handleSearch(event: any) {    
    console.log('searching');
    
    console.log(this.searchQuery);
    
    if (this.searchQuery.length <= 3) {
      delete this.searchParams.name;
    } else{      
      this.searchParams.name = this.searchQuery;
    }
    this.getActors();
  }

  onSearchQueryChange() {
    if (!this.searchQuery) {
      this.handleSearch(null);
    }
  }

  handleYearChange(event: any) {
    if (!event) {
      if (!this.searchParams.birth_date) {
        return;
      }
      delete this.searchParams.birth_date;
    } else {
      this.searchParams.birth_date = this.selectedYear?.getFullYear().toString();
    }
    this.getActors();
  }

  handleSortChange(event: any) {
    if (this.selectedOrder?.length === 0 || !this.selectedOrder) {
      delete this.searchParams.sort;
    } else {      
      this.searchParams.sort = event.value;
    }    
    this.getActors();
  }

  handlePageChange(event: PaginatorState): void {
    this.searchParams.page = (event.page || 0) + 1 ;
    this.getActors()
  }


  ngOnInit(): void {
    this.getActors();
  }
}
