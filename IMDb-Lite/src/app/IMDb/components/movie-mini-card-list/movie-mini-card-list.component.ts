import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'movie-mini-card-list',
  imports: [DataViewModule, CommonModule, DropdownModule, SelectModule, FormsModule],
  templateUrl: './movie-mini-card-list.component.html',
  styleUrl: './movie-mini-card-list.component.scss'
})
export class MovieMiniCardListComponent {

  @Input() public movies: any[] = [];
  
}
