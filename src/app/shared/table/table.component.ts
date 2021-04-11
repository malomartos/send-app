import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  // Array for column names
  @Input() columns: string[] = [];

  // Array with the data to show on the table
  @Input() rows: any[] = [];

  // Options to show edit and/or delete option
  @Input() options: {
    delete?: boolean,
    edit?: boolean
  }

  // Emitter for click on a row
  @Output() rowClickedEmitter = new EventEmitter<any>();

  // Emitter for click on a edit button
  @Output() editClickedEmitter = new EventEmitter<any>();


  // Emitter for click on a delete button
  @Output() deleteClickedEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

    this.setDefaultColumns();
    this.setDefaultOptions();
    
    
  }

  // It sets the column names to the Object.keys of the first row if no 
  // colum names were provided on colum input atribute
  setDefaultColumns() {

    if (this.rows?.length > 0){
      const rowKeys = Object.keys(this.rows[0]);

      for (let i = 0; i< rowKeys.length; i++) {
        this.columns[i] = this.columns[i] || rowKeys[i];
      }

    }

  }

  // Updates default options for edit and delete
  setDefaultOptions() {

    this.options = Object.assign({
      edit: true,
      delete: true
    }, this.options);

  }

  // Emits when a row is clicked
  rowClicked( event ) {
    this.rowClickedEmitter.emit(event);
  }

  // Emits when an edit button is clicked
  editClicked( event ) {
    this.editClickedEmitter.emit(event);
  }

  // Emits when a delete butotn is clicked
  deteteClicked( event ) {
    this.deleteClickedEmitter.emit(event);
  }

  // Funcion needed for keyvalue pipe to return Object.keys
  // as they are in a object instead of alphabetical order
  unsorted() {
    return null;
  }

}
