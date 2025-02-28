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
  @Output() closeModal = new EventEmitter<void>();  // Event emmiter notifes when modal should be closed

  constructor(private router: Router) {}  // Inject router to naviagte between routes 

  onAddMore() {
    this.closeModal.emit();  // Emit event to close modal
  }

  onViewHistory() {
    this.router.navigate(['/actions']);  // Redirect to /actions page when user clicks 'view history'
  }
}
