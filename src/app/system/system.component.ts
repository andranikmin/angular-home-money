import {Component, HostBinding} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'am-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTrigger]
})
export class SystemComponent {
  @HostBinding('@fade') a = true;

  constructor(private title: Title, private meta: Meta) {
    title.setTitle('System');
    meta.addTags([
      {name: 'keywords', content: 'system, login'},
      {name: 'description', content: 'system page'}
    ]);
  }
}
