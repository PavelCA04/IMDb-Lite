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

}
