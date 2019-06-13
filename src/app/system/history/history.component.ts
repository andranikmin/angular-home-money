import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import * as moment from 'moment';

import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {AMEvent} from '../shared/models/event.model';

@Component({
  selector: 'am-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService, private eventService: EventsService ) { }

  isLoaded = false;
  sub1: Subscription;

  categories: Category[] = [];
  events: AMEvent[] = [];
  filteredEvets: AMEvent[] = [];

  chartData = [];
  isFiltrVisible = false;

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], AMEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  private setOriginalEvents() {
    this.filteredEvets = [...this.events];
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvets.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toogleFilterVisibility(dir: boolean) {
    this.isFiltrVisible = dir;
  }

  openFilter() {
    this.toogleFilterVisibility(true);
  }

  onFilterApplay(filterData) {
    this.toogleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    console.log(filterData);
    this.filteredEvets = this.filteredEvets
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    console.log(filterData);

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toogleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
