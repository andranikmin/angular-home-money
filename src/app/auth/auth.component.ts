import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'am-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {
  @HostBinding('@fade') a = true;

  constructor(private router: Router, private title: Title, private meta: Meta) {
    title.setTitle('Login');
    meta.addTags([
      {name: 'keywords', content: 'login, system'},
      {name: 'description', content: 'login page'}
    ]);
  }

  ngOnInit() {
    this.router.navigate(['./login']);
  }
}
