import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() columns: string[];

  @Input() rows: any[];

  @Input() options: {
    delete?: boolean,
    edit?: boolean
  }

  @Output() editClickedEmitter = new EventEmitter<any>();

  @Output() deleteClickedEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

    this.setDefaultColumns();
    this.setDefaultOptions();
    
    
  }
  
  setDefaultColumns() {
    if (!this.columns && this.rows.length > 0){
      this.columns = Object.keys(this.rows[0]);
    }
  }

  setDefaultOptions() {
    this.options = Object.assign({
      edit: true,
      delete: true
    }, this.options);

  }

  editClicked(event) {
    this.editClickedEmitter.emit(event);
  }

  deteteClicked(event) {
    this.deleteClickedEmitter.emit(event);
  }

}
