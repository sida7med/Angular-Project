import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../weather';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() weather: Weather;
  @Input() articles: any[];
  constructor( private weatherService: WeatherService ) {}

  ngOnInit() {
    this.getWeathers();
  }

  getWeathers(): void {
    this.weatherService.getWeathers()
        .subscribe(weathers => this.weather = weathers[0]);
  }
}
