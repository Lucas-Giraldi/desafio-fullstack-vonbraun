import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../../../core/services/device.service';
import { Device } from '../../../models/device.model';

@Component({
  standalone: true,
  selector: 'app-device-by-id-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './device-by-id-modal.component.html',
  styleUrls: ['./device-by-id-modal.component.css']
})
export class DeviceByIdModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() deviceFound = new EventEmitter<Device>();

  deviceId: string = '';
  device: Device | null = null;
  loading = false;
  error: string | null = null;

  constructor(private deviceService: DeviceService) {}

  fetchDevice(): void {
    if (!this.deviceId) return;
    this.loading = true;
    this.error = null;

    this.deviceService.getDeviceById(this.deviceId).subscribe({
      next: (res: Device) => {
        this.device = res;
        this.loading = false;
        this.deviceFound.emit(res); // emite o Device corretamente
      },
      error: () => {
        this.error = 'Erro ao buscar device';
        this.loading = false;
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
