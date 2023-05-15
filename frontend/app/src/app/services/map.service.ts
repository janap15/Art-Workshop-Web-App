import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  longLatOfAaddress(address) {
    return this.http.get(`https://nominatim.openstreetmap.org/search.php?q=${address}&format=jsonv2`)
  }

  

}
