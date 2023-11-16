import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'https://dev.matiivilla.cl/duoc/location';

  constructor(private http: HttpClient) {}

  getRegions() {
    return this.http.get(`${this.apiUrl}/region`);
  }

  getCommunesByRegion(regionId: number) {
    return this.http.get(`${this.apiUrl}/comuna/${regionId}`);
  }

  getRegionName(regionId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/region/${regionId}`).pipe(
      map((response: any) => response.name)
    );
  }

  getCommuneName(communeId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/comuna/${communeId}`).pipe(
      map((response: any) => response.name)
    );
  }
}
