import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private API_KEY = 'b31db75524758c822408529323b53456'; // Remplacez par votre clé API
  private API_URL = `https://api.openweathermap.org/data/2.5/weather?`;

  constructor(private http: HttpClient) { }

  getWeather(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}`);
  }

  pregetWeather(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast/?lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}`);
  }

}
