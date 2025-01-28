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

@Component({
  selector: 'app-actors',
  imports: [MainHeaderComponent, CardListComponent, DatePickerModule, ButtonModule, 
    SelectModule, InputTextModule, FloatLabelModule, CommonModule, FormsModule, RouterModule
  ],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})
export class ActorsComponent {

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
}
