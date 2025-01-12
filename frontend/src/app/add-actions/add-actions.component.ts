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
  maxDate: string

  constructor(
    private fb: FormBuilder,
    private actionsService: ActionsService,  // Handles all API Calls
    private router: Router
  ) {
    this.initateForm()
    this.maxDate = this.getCurrentDate();
  }

  // Initialize the form with required fields and validators
  initateForm() {
    this.addActionForm = this.fb.group({
      action: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      date: ['', [Validators.required, this.futureDateValidator]],
      points: ['', [Validators.required, Validators.min(5), Validators.max(200)]]
    })
  }

  // Get the current date in 'yyyy-mm-dd' format
  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Validator to check if the selected date is not in the future
  futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to midnight to ignore time part

    if (selectedDate > currentDate) {
      return { futureDate: true }; // Add 'futureDate' error if the date is in the future
    }
    return null;
  }

  // Handle form submission to add a new action
  onSubmit() {
    if (this.addActionForm.valid) {
      const formData = this.addActionForm.value;

      // Prepare data for submission
      const formattedData = {
        ...formData,
        date: formData.date
      }

      // Call the service to add the action to the API
      this.actionsService.addActionToApi(formattedData).subscribe({
        next: (response) => {
          console.log('Action added Succesfully: ', response)
          this.showSuccessModal = true  // Show success modal
          this.addActionForm.reset()    // Reset form
        },
        error: (err) => {
          console.error('Error adding action:', err);
          this.errorMessage = err.error || 'Failed to add action. Please try again.';
        }

      })
    }
  }

  // Close the success modal and reset form
  closeSuccessModal() {
    this.showSuccessModal = false;
    this.addActionForm.reset();  // Reset form when closed
  }
}
