import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  gif: string="assets/car.gif";

  constructor() { }

  search(term: string): void {

  }

  ngOnInit() {
  }

}
