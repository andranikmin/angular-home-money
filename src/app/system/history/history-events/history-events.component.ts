import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {AMEvent} from '../../shared/models/event.model';

@Component({
  selector: 'am-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: AMEvent[] = [];

  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventClass(e: AMEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Цумма',
      date: 'Дата',
      category: 'Категориа',
      type: 'Тип'
    };
    this.searchPlaceholder = namesMap[field].toString();
    this.searchField = field;
  }

}
