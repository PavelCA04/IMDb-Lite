import { Component } from '@angular/core';
import { MovieMiniCardListComponent } from "../../components/movie-mini-card-list/movie-mini-card-list.component";
import { GalleryComponent } from "../../shared/gallery/gallery.component";
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeleteBtnComponent } from "../../shared/delete-btn/delete-btn.component";
import { IMDbService } from '../../services/imdb.service';
import { Actor } from '../../interfaces/imdb.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-page',
  imports: [
    MovieMiniCardListComponent, 
    GalleryComponent, 
    MainHeaderComponent, 
    TabsModule, 
    CardModule,
    ButtonModule, 
    RouterModule, 
    DeleteBtnComponent,
    CommonModule
  ],
  templateUrl: './actor-page.component.html',
  styleUrl: './actor-page.component.scss'
})
export class ActorPageComponent {
  
  public id: string = '';
  public imgPath: string = '';
  public actor: Actor | undefined = undefined;
  public images: string[] = [];

  constructor(
    private imdbService: IMDbService,
    private route: ActivatedRoute
  ){}

  public getActor() {
    this.imdbService.getActorById(this.id).subscribe(actor => {
      this.actor = actor;

      this.imgPath = actor?.images.find((image: any) => image.is_profile === true)?.url || '';  
      this.images = actor?.images
        .filter((image: any) => image.is_profile === false)
        .map((image: any) => image.url) || [];
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getActor();      
    });
  }
}
