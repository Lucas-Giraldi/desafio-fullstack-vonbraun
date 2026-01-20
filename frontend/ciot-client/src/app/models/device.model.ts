export interface Command {
  operation: string;
  description: string;
  commandText: string;
  result: string;
  format: string;
  parameters: string[];
}

export interface Device {
  identifier: string;
  description: string;
  manufacturer: string;
  url: string;
  commands: Command[];
}
