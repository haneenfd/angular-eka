// form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { IndexedDBService } from '../indexed-db.service';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
interface FormData {
  id?: number;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  age?: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  formData: FormData = {};

  constructor(
    private indexedDBService: IndexedDBService,
    private dataService: DataService
  ) {}

  async onSubmit(form: NgForm) {
    try {
      await this.indexedDBService.addItem(this.formData);
      this.formData = {};
      this.dataService.updateData();
      form.resetForm();
    } catch (error) {
      console.error(error);
    }
  }
  
}

