import { Component, OnInit, OnDestroy } from "@angular/core";
import { IndexedDBService } from "../indexed-db.service";
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
interface data {
  id: number;
  firstName: string;
  secondName: string;
  lastName: string;
  age: string;
  isEdit?: boolean;
  dataCopy?: any;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class headerComponent implements OnInit, OnDestroy {
  headers: string[] = ["First Name", "Last Name", "Final Name", "Age", "Action"];
  dataRow: data[] = [];
  private dataSubscription: Subscription = new Subscription;
  constructor(
    private indexedDBService: IndexedDBService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getDataFromIndexedDB();
    this.dataSubscription = this.dataService.dataUpdated.subscribe(() => {
      this.getDataFromIndexedDB();
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
  async getDataFromIndexedDB() {
    try {
      this.dataRow = await this.indexedDBService.getItems();
      this.dataRow.forEach(item => item.isEdit = false);
    } catch (error) {
      console.error(error);
    }
  }
  async onDelete(id: number) {
    try {
      await this.indexedDBService.deleteItem(id);
      await this.getDataFromIndexedDB();
    } catch (error) {
      console.error(error);
    }
  }

  onUpdate(row: data) {
    row.isEdit = true;
    row.dataCopy = { ...row };

  }
  onCancel(row: data) {
    row.isEdit = false;
    row.firstName = row.dataCopy.firstName;
    row.secondName = row.dataCopy.secondName;
    row.lastName = row.dataCopy.lastName;
    row.age = row.dataCopy.age;
  }
  async onSave(row: data) {
    try {
      await this.indexedDBService.updateItem(row.id, row);
      row.isEdit = false;
    } catch (error) {
      console.error(error);
    }
  }


  isValid(row: any): boolean {
    const nameRegex = /^[A-Za-z]+$/;

    return row.firstName && row.firstName.trim() !== '' && nameRegex.test(row.firstName.trim()) &&
      row.secondName && row.secondName.trim() !== '' && nameRegex.test(row.secondName.trim()) &&
      row.lastName && row.lastName.trim() !== '' && nameRegex.test(row.lastName.trim()) &&
      row.age && row.age >= 1;
  }
  isChanged(row: data): boolean {
    console.log(row);
    return row.firstName !== row.dataCopy.firstName ||
      row.lastName !== row.dataCopy.lastName ||
      row.age !== row.dataCopy.age ||
      row.secondName !== row.dataCopy.secondName;
  }

}