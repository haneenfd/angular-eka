import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataUpdated = new EventEmitter<any>();

  constructor() { }

  updateData() {
    this.dataUpdated.emit();
  }
}
