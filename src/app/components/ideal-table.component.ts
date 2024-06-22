import {Component, OnInit, ViewChild} from "@angular/core";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  quantity: number;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', quantity: 100},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', quantity: 100},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', quantity: 100},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', quantity: 100},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', quantity: 100},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', quantity: 100},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', quantity: 100},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', quantity: 100},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', quantity: 100},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', quantity: 100},
];

@Component({
  selector: 'app-ideal-table',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatTableModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  template: `
    <!-- TODO Klassen von Example file rein! FÜr Cursor und co-->
    <!-- TODO Mobile Responsive??? -->
    <form [formGroup]="form">
      <mat-table #table [dataSource]="dataSource.controls" class="mat-elevation-z8" cdkDropList
                 (cdkDropListDropped)="drop($event)"
                 cdkDropListData="dataSource.controls">
        <!-- Position Column -->
        <ng-container matColumnDef="position" sticky> nb'

          <mat-header-cell *matHeaderCellDef> No.</mat-header-cell>
          <mat-cell *matCellDef="let element" [formGroup]="element">
            <mat-icon class="example-drag-cursor">reorder</mat-icon>
            <span>{{ element.get('position')?.value }}</span>
          </mat-cell>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef> Name</mat-header-cell>
          <mat-cell *matCellDef="let element" [formGroup]="element">
            <mat-form-field subscriptSizing="dynamic">
              <input matInput formControlName="name">
            </mat-form-field>
          </mat-cell>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="weight">
          <mat-header-cell *matHeaderCellDef> Weight</mat-header-cell>
          <mat-cell *matCellDef="let element" [formGroup]="element">
            <mat-form-field subscriptSizing="dynamic">
              <input matInput formControlName="weight">
            </mat-form-field>
          </mat-cell>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="symbol">
          <mat-header-cell *matHeaderCellDef> Symbol</mat-header-cell>
          <mat-cell *matCellDef="let element" [formGroup]="element">
            <mat-form-field subscriptSizing="dynamic">
              <input matInput formControlName="symbol">
            </mat-form-field>
          </mat-cell>
        </ng-container>

        <!-- Quantity Column -->
        <ng-container matColumnDef="quantity">
          <mat-header-cell *matHeaderCellDef> Quantity of Element</mat-header-cell>
          <mat-cell *matCellDef="let element" [formGroup]="element">
            <mat-form-field subscriptSizing="dynamic">
              <input matInput formControlName="quantity">
            </mat-form-field>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;" cdkDrag [cdkDragData]="row"></mat-row>
      </mat-table>
    </form>
  `
})
export class IdealTableComponent implements OnInit {
  @ViewChild('table', {static: true}) table: MatTable<PeriodicElement> | undefined;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'quantity'];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      elements: this.fb.array([])
    });
  }

  get dataSource() {
    return this.form.get('elements') as FormArray;
  }

  ngOnInit() {
    const elementsFGs = ELEMENT_DATA.map(element =>
      this.fb.group({
        position: [element.position],
        name: [element.name],
        weight: [element.weight],
        symbol: [element.symbol],
        quantity: [element.quantity]
      })
    );
    const elementFormArray = this.fb.array(elementsFGs);
    this.form.setControl('elements', elementFormArray);
  }

  drop(event: CdkDragDrop<string, any>) {
    const previousIndex = this.dataSource.controls.findIndex(d => d === event.item.data);

    moveItemInArray(this.dataSource.controls, previousIndex, event.currentIndex);
    this.table?.renderRows();
  }
}
