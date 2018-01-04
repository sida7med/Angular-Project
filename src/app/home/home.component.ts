import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { trigger, transition, group, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('1 => 2', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(100%)' })),
        query(':enter, :leave', style({ position:'absolute', top:'0', right:'0', left:'0' })),
        group([
          query(':leave', [
                    animate('0.8s ease-in-out', style({ transform: 'translateX(-100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.8s ease-in-out', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
        transition('2 => 1', [
          style({ height: '!' }),
          query(':enter', style({ transform: 'translateX(-100%)' })),
          query(':enter, :leave', style({ position:'absolute', top:'0', right:'0', left:'0' })),
          group([
            query(':leave', [
                      animate('0.8s ease-in-out', style({ transform: 'translateX(100%)' })),
                  ]),
                  // and now reveal the enter
                  query(':enter', animate('0.8s ease-in-out', style({ transform: 'translateX(0)' }))),
              ]),
          ]),
      ]),
  ]
})
export class HomeComponent implements OnInit {

  constructor(router: Router, activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }

}
