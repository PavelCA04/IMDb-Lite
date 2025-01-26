import { Component, Input } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'shared-gallery',
  imports: [GalleriaModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  @Input() public images:string[] = [];

  // data to test the component
  /*public images: string[] = [
    "https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria16.jpg"
  ];*/

}
