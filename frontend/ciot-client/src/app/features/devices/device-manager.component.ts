import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../../core/services/device.service';
import { Device } from '../../models/device.model';
import { DeviceModalComponent } from './device-modal/device-modal.component';
import { DeviceByIdModalComponent } from './device-modal/device-by-id-modal.component';

@Component({
  standalone: true,
  selector: 'app-device-manager',
  imports: [CommonModule, FormsModule, DeviceModalComponent, DeviceByIdModalComponent],
  templateUrl: './device-manager.component.html',
  styleUrls: ['./device-manager.component.css']
})
export class DeviceManagerComponent implements OnInit {
  devices: Device[] = [];
  loading = true;
  error: string | null = null;

  showModal = false;
  showGetByIdModal = false;

  newDevice: Device = {
    identifier: '',
    description: '',
    manufacturer: '',
    url: '',
    commands: []
  };

  selectedCommands: { [deviceId: string]: string } = {};
  commandParameters: { [deviceId: string]: string } = {};
  executionResults: { [deviceId: string]: { status: 'success' | 'error'; message: string } } = {};

  constructor(
    private deviceService: DeviceService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllDevices();
    }
  }

  getAllDevices(): void {
    this.loading = true;
    this.deviceService.getDevices().subscribe({
      next: (devices: Device[]) => {
        this.devices = [...devices];
        this.loading = false;
        this.error = null;

        for (const device of devices) {
          if (device.commands?.length > 0) {
            this.selectedCommands[device.identifier] = device.commands[0].operation;
          }
        }

        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erro ao carregar devices';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openCreateModal(): void {
    this.newDevice = {
      identifier: '',
      description: '',
      manufacturer: '',
      url: '',
      commands: []
    };
    this.showModal = true;
  }

  openGetByIdModal(): void {
    this.showGetByIdModal = true;
  }

  handleCreate(device: Device): void {
    this.deviceService.createDevice(device).subscribe({
      next: (created: Device) => {
        this.devices.push(created);
        this.showModal = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erro ao criar device';
        this.cdr.detectChanges();
      }
    });
  }

  handleDeviceById(device: Device): void {
    this.devices = [device];
    this.showGetByIdModal = false;

    if (device.commands?.length > 0) {
      this.selectedCommands[device.identifier] = device.commands[0].operation;
    }

    this.cdr.detectChanges();
  }

  executeDevice(deviceId: string): void {
    const command = this.selectedCommands[deviceId];
    const param = this.commandParameters[deviceId];

    const body = {
      device_id: deviceId,
      command: command,
      parameters: param ? [param] : []
    };

    this.deviceService.executeCommand(body).subscribe({
      next: (res: { result: string }) => {
        this.executionResults[deviceId] = { status: 'success', message: res.result };
        this.cdr.detectChanges();
      },
      error: () => {
        this.executionResults[deviceId] = { status: 'error', message: 'Erro ao executar comando' };
        this.cdr.detectChanges();
      }
    });
  }

  hasParameters(deviceId: string): boolean {
    const device = this.devices.find(d => d.identifier === deviceId);
    const selected = this.selectedCommands[deviceId];
    const command = device?.commands.find(c => c.operation === selected);
    return Array.isArray(command?.parameters) && command.parameters.length > 0;
  }

  formatJson(obj: any): string {
    const json = JSON.stringify(obj, null, 2)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return json
      .replace(/("(.*?)")(\s*:\s*)/g, '<span class="json-key">$1</span>$3')
      .replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/:\s*(\d+)/g, ': <span class="json-number">$1</span>');
  }
}
