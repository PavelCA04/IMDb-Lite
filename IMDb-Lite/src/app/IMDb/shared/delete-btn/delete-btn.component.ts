import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-delete-btn',
  imports: [ConfirmDialog, ButtonModule, ToastModule],
  templateUrl: './delete-btn.component.html',
  styleUrl: './delete-btn.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class DeleteBtnComponent {

  public currentPage: 'movies' | 'actors' = 'movies';

  public constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    if (!this.router.url.includes('actors')) {
      return;                                                                             // not in the actors page
    }
    this.currentPage = 'actors';
  }

  public confirm(): void {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'The data was eliminated' });
      }
    });
  }

}
