import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'actor-mini-card-list',
  imports: [DataViewModule, CommonModule, DropdownModule, SelectModule, FormsModule],
  templateUrl: './actor-mini-card-list.component.html',
  styleUrl: './actor-mini-card-list.component.scss'
})
export class ActorMiniCardListComponent {

  @Input() public actors: any[] = [];
  
  // data to test the component
  items = [
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg', text: 'Actor name 1', year: 2020 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg', text: 'Actor name 2', year: 2019 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg', text: 'Actor name 3', year: 2021 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg', text: 'Actor name 4', year: 2018 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg', text: 'Actor name 5', year: 2022 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg', text: 'Actor name 6', year: 2017 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg', text: 'Actor name 7', year: 2023 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg', text: 'Actor name 8', year: 2020 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg', text: 'Actor name 9', year: 2016 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg', text: 'Actor name 10', year: 2015 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg', text: 'Actor name 11', year: 2019 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg', text: 'Actor name 12', year: 2014 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg', text: 'Actor name 13', year: 2021 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg', text: 'Actor name 14', year: 2013 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg', text: 'Actor name 15', year: 2022 }
  ];
  
}
