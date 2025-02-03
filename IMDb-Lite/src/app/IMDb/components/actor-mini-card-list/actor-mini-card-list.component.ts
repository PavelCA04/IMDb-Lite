import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { CastMember } from '../../interfaces/imdb.interfaces';

@Component({
  selector: 'actor-mini-card-list',
  imports: [DataViewModule, CommonModule, DropdownModule, SelectModule, FormsModule],
  templateUrl: './actor-mini-card-list.component.html',
  styleUrl: './actor-mini-card-list.component.scss'
})
export class ActorMiniCardListComponent {

  @Input() public actors: CastMember[] | undefined = [];
  public url = 'actor/';

  ngOnInit(){
    console.log('Actor mini card', this.actors);
  }
  
}
