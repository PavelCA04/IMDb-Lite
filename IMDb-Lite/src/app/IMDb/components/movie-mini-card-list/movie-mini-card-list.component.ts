import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { MovieInformation } from '../../interfaces/imdb.interfaces';

@Component({
  selector: 'movie-mini-card-list',
  imports: [DataViewModule, CommonModule, DropdownModule, SelectModule, FormsModule],
  templateUrl: './movie-mini-card-list.component.html',
  styleUrl: './movie-mini-card-list.component.scss'
})
export class MovieMiniCardListComponent {

  @Input() public movies: MovieInformation[] | undefined = [];

  public getCoverImage(item: any): string {
    return item.images?.find((img: any) => img.is_cover)?.url;
  }

}
