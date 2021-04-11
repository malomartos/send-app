import { Component, Input, OnInit, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {

  // Total pages
  @Input() totalPagesNumber: number;

  // Active page
  @Input() activePage: number;

  // Number of pages to show before and after the active page 
  @Input() pageRangeToShow = 5;

  // Emitter to notify when a page is clicked
  @Output() pageClickedEmitter = new EventEmitter<number>();

  // Variable to iterate on the template
  totalPages = [];


  constructor() { }

  ngOnInit(): void {

    //Total pages initialization;
    this.totalPages = this.arrayOf(this.totalPagesNumber);

    //Active page initializtion
    this.activePage = this.activePage | 0;

  }

  ngOnChanges(): void {

    // Total pages update
    this.totalPages = this.arrayOf(this.totalPagesNumber);

  }


  arrayOf(number) {
    // Returns an array of the length equals to the number parameter
    return [...Array(number).keys()];
  }

  // Method to emit when a page is clicked
  pageClicked( event: number ) {

    this.pageClickedEmitter.next(event);

    //When a page is clicked we need to update the active page
    this.activePage = event;
  }

  // Method to emit when the 'first page' is clicked
  firstPageClicked() {
    this.activePage = 0;
    this.pageClickedEmitter.next(this.activePage);
  }

  // Method to emit when the 'next page' is clicked
  nextPageClicked() {
    this.activePage++;
    this.pageClickedEmitter.next(this.activePage);
  }

  // Method to emit when the 'previous page' is clicked
  previousPageClicked() {
    this.activePage-- ;
    this.pageClickedEmitter.next(this.activePage);
  }

  // Method to emit when the 'last page' is clicked
  lastPageClicked() {
    this.activePage = this.totalPages.length - 1;
    this.pageClickedEmitter.next( this.activePage );
  }

}
