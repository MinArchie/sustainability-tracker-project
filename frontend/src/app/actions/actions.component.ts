import { Component, inject, OnInit, signal } from '@angular/core';
import { ActionsService } from '../services/actions.service';
import { Action } from '../model/actions.type'; 
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../components/pagination/pagination.component";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  actionService = inject(ActionsService);
  actionItems = signal<Array<Action>>([]);  // Signal to store action items

  totalItems = signal(0);
  currentPage = 1
  itemsPerPage = 10

  // method handles page changes
  changePage(page: number) {
    this.currentPage=page
  }

  // OnInit lifecycle hook to fetch actions data from API
  ngOnInit(): void {
    this.actionService.getActionsFromApi()
      .pipe(
        catchError((err) => {
          console.error('Error fetching actions:', err);
          return [];
        })
      )
      .subscribe({
        next: (actions) => {
          this.actionItems.set(actions);
          this.totalItems.set(actions.length); 
        },
        error: (error) => {
          console.error('Subscription error:', error);
        }
      });
  }

  // Get the paginated data based on current page and items per page
  get paginatedData() {
    const start = (this.currentPage-1) * this.itemsPerPage
    const end = start + this.itemsPerPage

    return this.actionItems().slice(start,end)
  }

  // Calculate the total points from the action items
  getTotalPoints(): number {
    return this.actionItems().reduce((sum, item) => sum + item.points, 0)
  }
}
