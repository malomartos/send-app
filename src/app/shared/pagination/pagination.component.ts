import { Component, Input, OnInit, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalPagesNumber: number;

  @Input() activePage: number;

  @Input() pageRangeToShow = 5;

  @Output() pageClickedEmitter = new EventEmitter<number>();

  totalPages = [];


  constructor() { }

  ngOnInit(): void {
    this.totalPages = this.arrayOf(this.totalPagesNumber);
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
