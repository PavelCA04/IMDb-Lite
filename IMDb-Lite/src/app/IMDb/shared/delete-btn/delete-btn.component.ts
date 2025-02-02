import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { IMDbService } from '../../services/imdb.service';

@Component({
  selector: 'shared-delete-btn',
  imports: [ConfirmDialog, ButtonModule, ToastModule],
  templateUrl: './delete-btn.component.html',
  styleUrl: './delete-btn.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class DeleteBtnComponent {

  public id = '';
  public currentPage: 'movies' | 'actors' = 'movies';

  public constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private imdbService: IMDbService
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (!this.router.url.includes('actors')) {
      return;
    }
    this.currentPage = 'actors';
  }

  private deleteActor(): void {
    this.imdbService.deleteActorById(this.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'The data was eliminated' });
    });
  }

  public confirm(): void {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        if (this.currentPage === 'actors') {
          this.deleteActor();
        }
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'The data was eliminated' });
        setTimeout(() => {
          this.router.navigate(['actors']);
        }, 3000);
      }
    });
  }

}
