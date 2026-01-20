import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../core/services/device.service';
import { Device, Command } from '../../models/device.model';

@Component({
  standalone: true,
  selector: 'app-device-list',
  imports: [CommonModule],
  template: `
    <h2>Devices</h2>

    <div *ngIf="loading">Carregando...</div>
    <div *ngIf="error">{{ error }}</div>

    <table *ngIf="!loading && !error && devices.length > 0" border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Identifier</th>
          <th>Description</th>
          <th>Manufacturer</th>
          <th>URL</th>
          <th>Commands</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let device of devices">
          <td>{{ device.identifier }}</td>
          <td>{{ device.description }}</td>
          <td>{{ device.manufacturer }}</td>
          <td>{{ device.url }}</td>
          <td>
            <button (click)="openCommands(device.commands)">Ver Commands</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="showModal" class="modal-backdrop">
      <div class="modal">
        <h3>Commands</h3>
        <ul>
          <li *ngFor="let cmd of modalCommands">
            <strong>{{ cmd.operation }}</strong>: {{ cmd.description }} ({{ cmd.result }})
          </li>
        </ul>
        <button (click)="closeModal()">Fechar</button>
      </div>
    </div>
  `,
  styles: [`
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { text-align: left; }
    button { cursor: pointer; }
    .modal-backdrop {
      position: fixed; top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
    }
    .modal {
      background: white; padding: 16px; border-radius: 8px; width: 300px;
    }
  `]
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  loading = true;
  error: string | null = null;

  showModal = false;
  modalCommands: Command[] = [];

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe({
      next: devices => {
        console.log('Devices recebidos:', devices);
        this.devices = devices;
        this.loading = false; // <-- importantíssimo
        this.error = null;    // <-- limpar erro
      },
      error: err => {
        console.error(err);
        this.error = 'Erro ao carregar devices';
        this.loading = false;
      }
    });
  }

  openCommands(commands: Command[]) {
    this.modalCommands = commands;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalCommands = [];
  }
}
