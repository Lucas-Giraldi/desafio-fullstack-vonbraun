// device.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly baseUrl = 'http://localhost:5000/api/device';

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.baseUrl); 
  }
}
