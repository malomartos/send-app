import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() columns: string[] = [];

  @Input() rows: any[] = [];

  @Input() options: {
    delete?: boolean,
    edit?: boolean
  }

  @Output() rowClickedEmitter = new EventEmitter<any>();

  @Output() editClickedEmitter = new EventEmitter<any>();

  @Output() deleteClickedEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

    this.setDefaultColumns();
    this.setDefaultOptions();
    
    
  }
  
  setDefaultColumns() {
    if (this.rows?.length > 0){
      const rowKeys = Object.keys(this.rows[0]);
      for (let i = 0; i< rowKeys.length; i++) {
        this.columns[i] = this.columns[i] || rowKeys[i];
      }
    }
  }

  setDefaultOptions() {
    this.options = Object.assign({
      edit: true,
      delete: true
    }, this.options);

  }

  rowClicked( event ) {
    this.rowClickedEmitter.emit(event);
  }

  editClicked( event ) {
    this.editClickedEmitter.emit(event);
  }

  deteteClicked( event ) {
    this.deleteClickedEmitter.emit(event);
  }

  unsorted() {
    return null;
  }

}
