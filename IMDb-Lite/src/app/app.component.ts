import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { CardListComponent } from "./IMDb/shared/card-list/card-list.component";

type CardType = { title: string; imgSource: string; numericValue: number; type: 'movie' | 'actor' };

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, CardListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent {
  title = 'IMDb-Lite';

  public constructor(
    private primeng: PrimeNG, 
  ) {
    this.primeng.theme.set({
      preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
    })
  }

  // example to use the card-list with movies - change type to see actors
  /*cards: CardType[] = [
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Elemental', imgSource: "https://www.youloveit.com/uploads/posts/2023-05/1683139077_youloveit_com_elemental_new_poster.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Frozen 2', imgSource: "https://cdn.hmv.com/r/w-960/hmv/files/a0/a099c26d-4b1b-43c0-87ef-74d0d728f7b9.jpg", numericValue: 2020, type: 'movie' },
    { title: 'Inside Out 2', imgSource: "https://ik.imagekit.io/9ifn2ouyo26/movies/inside-out-2/inside-out-2-poster.jpg", numericValue: 2020, type: 'movie' },
  ];*/
  
}
