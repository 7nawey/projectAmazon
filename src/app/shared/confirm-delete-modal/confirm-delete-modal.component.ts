import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  imports: [],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.css'
})
export class ConfirmDeleteModalComponent {
  @Input() itemName: any = 'this item';
  @Output() onConfirm = new EventEmitter<void>();

  confirmDelete() {
    this.onConfirm.emit();
  }
}
