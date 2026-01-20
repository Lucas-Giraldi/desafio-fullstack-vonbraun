export interface Command {
  operation: string;
  description: string;
  command: {
    commandText: string;
    parameters: any[];
  };
  result: string;
  format: string;
}

export interface Device {
  identifier: string;
  description: string;
  manufacturer: string;
  url: string;
  commands: Command[];
}
