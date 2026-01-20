import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Device, Command } from '../../../models/device.model';

@Component({
  standalone: true,
  selector: 'app-device-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.css']
})
export class DeviceModalComponent implements OnInit {
  @Input() initialData!: Device;
  @Output() submit = new EventEmitter<Device>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit(): void {
    // garante que todos os comandos tenham parameters inicializado
    this.initialData.commands.forEach(cmd => {
      if (!cmd.parameters) {
        cmd.parameters = [];
      }
    });
  }

  addCommand(): void {
    const newCommand: Command = {
      operation: '',
      description: '',
      commandText: '',
      result: '',
      format: '',
      parameters: [] // sempre inicializado
    };
    this.initialData.commands.push(newCommand);
  }

  addParameter(cmd: Command): void {
    cmd.parameters = [...(cmd.parameters || []), ''];
  }

  onSubmit(): void {
    this.submit.emit(this.initialData);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
