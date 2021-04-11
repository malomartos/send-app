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
    
    this.totalPages = this.arrayOf(this.totalPagesNumber);
    this.activePage = this.activePage | 0;
  }

  arrayOf(number) {
    return [...Array(number).keys()];
  }

  pageClicked( event: number ) {
    this.pageClickedEmitter.next(event);
    this.activePage = event;
  }

  firstPageClicked() {
    this.activePage = 0;
    this.pageClickedEmitter.next(this.activePage);
  }

  nextPageClicked() {
    this.activePage++;
    this.pageClickedEmitter.next(this.activePage);
  }

  previousPageClicked() {
    this.activePage-- ;
    this.pageClickedEmitter.next(this.activePage);
  }

  lastPageClicked() {
    this.activePage = this.totalPages.length - 1;
    this.pageClickedEmitter.next( this.activePage );
  }

}
