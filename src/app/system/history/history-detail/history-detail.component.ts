import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {pipe, Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {AMEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'am-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event1: AMEvent;
  category: Category;

  isLoaded = false;
  sub1: Subscription;

  constructor(private route: ActivatedRoute,
              private eventService: EventsService,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.sub1 = this.route.params
      .pipe(
        mergeMap(
        (params: Params) => this.eventService.getEventByid(params.id)),
        mergeMap(
          (event: AMEvent) => {
          this.event1 = event;
          return this.categoriesService.getCategoryBuId(event.category);
        })
      ).subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
