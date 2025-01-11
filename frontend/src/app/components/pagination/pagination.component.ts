import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Output() onClick: EventEmitter<number>= new EventEmitter()
  
  totalPages: number = 0;
  pages: number[] = [];  // array to store number of pages

  ngOnInit(): void {
    this.calculatePages();  // calculate pages when component initalizes 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['itemsPerPage']) {
      this.calculatePages();  // recalculate pages if input changes 
    }
  }

  private calculatePages(): void {
    if (this.totalItems && this.itemsPerPage) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);       // calculate total pages
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);  // create array to store number of pages
    }
  }

  pageClicked(page: number) {
    if (page<=this.totalPages) {
      this.onClick.emit(page)   // keep track of page
    }
  } 
}