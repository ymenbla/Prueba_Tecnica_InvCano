import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private dialog = inject(MatDialog);

  confirm(title: string, message: string) {

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: { title, message }
    });

    return dialogRef.afterClosed();
  }
}
