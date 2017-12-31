import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather =
    {
      _id:0,
      id: "1",
      location: "Sousse",
      temp: "69 °F",
      low: "57",
      high: "67",
      feel: "Partly Sunny",
      realFeel: "67",
      chanceRain: "15%",
      windSpeed: "20 MPH"
    };
  constructor() { }

  ngOnInit() {
  }

}
