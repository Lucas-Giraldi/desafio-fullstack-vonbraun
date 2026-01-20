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

  getDeviceById(id: string): Observable<Device> {
    return this.http.get<Device>(`${this.baseUrl}/${id}`);
  }

  createDevice(body: any): Observable<Device> {
    return this.http.post<Device>(this.baseUrl, body);
  }

  executeCommand(body: { device_id: string; command: string; parameters: any[] }): Observable<{ result: string }> {
    return this.http.post<{ result: string }>(`${this.baseUrl}/execute`, body);
  }
}
