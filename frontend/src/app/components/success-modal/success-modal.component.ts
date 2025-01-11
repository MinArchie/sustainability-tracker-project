import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss'
})
export class SuccessModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  constructor(private router: Router) {}

  onAddMore() {
    this.closeModal.emit();
  }

  onViewHistory() {
    this.router.navigate(['/actions']);
  }
}
