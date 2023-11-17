import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Item } from '../models/item';
import {v4 as uuidv4, v4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class UsbInventoryService {
  private categories: Category[] = [
    { id: 1, name: 'USB A' },
    { id: 2, name: 'USB B' },
    { id: 3, name: 'USB c' },
  ];

  items: Item[];

  getItems(): Item[] {
    return this.items;
  }

  addItem(item: Item): string {
    this.items.push(item);
    return item.id;
  }

  filterItems(filter: ItemFilter): Item[] {
    return this.items.filter((item) => {

      if (filter.model && !item.modelName.toLowerCase().includes(filter.model.toLowerCase())) {
        return false;
      }

      if (filter.categoryId && item.categoryId !== filter.categoryId) {
        return false;
      }

      if (
        (filter.minCapacity && item.capacity < filter.minCapacity) ||
        (filter.maxCapacity && item.capacity > filter.maxCapacity)
      ) {
        return false;
      }

      return true; 
    });
  }


  private getCategoryName(categoryId: number): string {
    const foundCategory = this.categories.find(category => category.id == categoryId);
    return foundCategory ? foundCategory.name : "Error";
  }

  constructor() {
    this.items = [
      {
        id: v4(),
        modelName: "Model 1",
        categoryId: 1,
        capacity: 32,
        isAvailable: true
      },
      {
        id: v4(),
        modelName: "Model 2",
        categoryId: 2,
        capacity: 16,
        isAvailable: false
      },
      {
        id: v4(),
        modelName: "Model 3",
        categoryId: 3,
        capacity: 8,
        isAvailable: true
      },
    ]
   }


}
