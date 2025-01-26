import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-movie-mini-card-list',
  imports: [DataViewModule, CommonModule, DropdownModule, SelectModule, FormsModule],
  templateUrl: './movie-mini-card-list.component.html',
  styleUrl: './movie-mini-card-list.component.scss'
})
export class MovieMiniCardListComponent {

  @Input() public movies: any[] = [];
  public sortField: string = 'text';                                                      // default sorting field
  public sortOrder: number = 1;                                                           // 1 for ascending, -1 for descending

  public sortOptions = [                                                                  // sorting options for the dropdown
    { label: 'Sort by title - ascending', value: 'text' },
    { label: 'Sort by title - descending', value: '!text' },
    { label: 'Sort by year - ascending', value: 'year' },
    { label: 'Sort by year - descending', value: '!year' },
  ];

  public onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }

  }
  
  // data to test the component
  items = [
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg', text: 'Movie name 1', year: 2020 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg', text: 'Movie name 2', year: 2019 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg', text: 'Movie name 3', year: 2021 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg', text: 'Movie name 4', year: 2018 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg', text: 'Movie name 5', year: 2022 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg', text: 'Movie name 6', year: 2017 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg', text: 'Movie name 7', year: 2023 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg', text: 'Movie name 8', year: 2020 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg', text: 'Movie name 9', year: 2016 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg', text: 'Movie name 10', year: 2015 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg', text: 'Movie name 11', year: 2019 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg', text: 'Movie name 12', year: 2014 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg', text: 'Movie name 13', year: 2021 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg', text: 'Movie name 14', year: 2013 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg', text: 'Movie name 15', year: 2022 }
  ];

}
