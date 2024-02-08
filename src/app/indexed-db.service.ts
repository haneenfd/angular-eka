import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private db!: Dexie;

  constructor() {
    this.createDatabase();
  }

  private createDatabase() {
    this.db = new Dexie('myDatabase');
    this.db.version(3).stores({
      user: '++id,firstName, secondName, lastName, age' 
    });
  }
  addItem(form:any) {
    return this.db.table('user').add(form);
  }
  getItems() {
    return this.db.table('user').toArray(); 
  }

  deleteItem(id: number) {
    return this.db.table('user')
      .where({ id:id }) 
      .delete();
  }
  updateItem(id: number, newData: any) {
    return this.db.table('user').update(id, newData);
  }
  

}
