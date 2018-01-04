import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const articles = [
      {
        id: 1,
        title: "Building Collapse",
        photo: "assets/building.jpg",
        details: "the wolf building has collapsed at 8:00 am today and  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet"+
         "consectetur, adipisci velit .There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain... ...",
        location: "Sousse",
        category: "Danger"
      },
      {
        id: 2,
        title: "Crash",
        photo: "assets/crash.jpg",
        details: "Crash at 21 jumpstreet Neque porro quisquam est qui dolorem ipsum quia dolor sit amet"+
         "consectetur, adipisci velit .There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain... ...",
        location: "Monastir",
        category: "Danger"
      },
      {
        id: 3,
        title: "Traffic jam",
        photo: "assets/traffic.jpg",
        details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit .Neque porro quisquam est qui dolorem ipsum quia dolor sit amet"+
         "consectetur, adipisci velit .There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain... ...",
        location: "Sousse",
        category: "normal"
      },
      {
        id: 4,
        title: "Manifestation",
        photo: "assets/manifest.jpg",
        details: "the wolf building has collapsed at 8:00 am today and Neque porro quisquam est qui dolorem ipsum quia dolor sit amet"+
         "consectetur, adipisci velit .There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain... ...",
        location: "Monastir",
        category: "Danger"
      },
      {
        id: 5,
        title: "Manifestation",
        photo: "assets/police.jpg",
        details: "the wolf building has collapsed at 8:00 am today and Neque porro quisquam est qui dolorem ipsum quia dolor sit amet"+
         "consectetur, adipisci velit .There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain... ...",
        location: "Monastir",
        category: "warning"
      },
      {
        id: 6,
        title: "Road rage",
        photo: "assets/rage.jpg",
        details: "the wolf building has collapsed at 8:00 am today and Neque porro quisquam est qui dolorem ipsum quia dolor sit amet"+
         "consectetur, adipisci velit .There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain... ...",
        location: "Monastir",
        category: "Danger"
      }
    ];

    const weathers = [
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
      },
      {
        _id:1,
        id: "2",
        location: "Monastir",
        temp: "60 °F",
        low: "52",
        high: "63",
        feel: "Cloudy",
        realFeel: "63",
        chanceRain: "45%",
        windSpeed: "40 MPH"
      }
    ];
    return {weathers, articles};
  }
}
