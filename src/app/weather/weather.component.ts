import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input() weather: Weather;
  constructor( private weatherService: WeatherService ) {}

  ngOnInit() {
    this.getWeathers();
  }

  getWeathers(): void {
    this.weatherService.getWeathers()
        .subscribe(weathers => this.weather = weathers[0]);
  }

}
