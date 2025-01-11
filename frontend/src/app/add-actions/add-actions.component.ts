import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionsService } from '../services/actions.service';
import { Router } from '@angular/router';
import { SuccessModalComponent } from '../components/success-modal/success-modal.component';

@Component({
  selector: 'app-add-actions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, SuccessModalComponent],
  templateUrl: './add-actions.component.html',
  styleUrl: './add-actions.component.scss'
})
export class AddActionsComponent {
  addActionForm!: FormGroup
  errorMessage: string = ''
  showSuccessModal = false  // Control Display of Success Modal

  constructor(
    private fb: FormBuilder,
    private actionsService: ActionsService,  // Handles all API Calls
    private router: Router
  ) {
    this.initateForm()
  }

  
  /*
  +-------------------------------------------------+
  |  post form validatiors.                         |
  |  action: string, 3-50 characters, required.     |
  |  date: date, iso format [yyyy/MM/dd], required. |
  |  points: number, between 5-200, requried.       |
  +-------------------------------------------------+
  */
  initateForm() {
    this.addActionForm = this.fb.group({
      action: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      date: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(5), Validators.max(200)]]
    })
  }

  onSubmit() {
    if (this.addActionForm.valid) {
      const formData = this.addActionForm.value;

      // prepare data for submission
      const formattedData = {
        ...formData,
        date: formData.date
      }

      // Call the service to add the action to the API
      this.actionsService.addActionToApi(formattedData).subscribe({
        next: (response) => {
          console.log('Action added Succesfully: ', response)
          this.showSuccessModal = true  // show success modal
          this.addActionForm.reset()    // reset form
        },
        error: (err) => {
          console.error('Error adding action:', err);
          this.errorMessage = err.error || 'Failed to add action. Please try again.';
        }

      })
    }
  }

  // close the success modal and reset form
  closeSuccessModal() {
    this.showSuccessModal = false;
    this.addActionForm.reset();  // reset form when closed
  }
}
