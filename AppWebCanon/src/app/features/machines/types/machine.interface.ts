export interface Machine {
  machineId: number;
  code: string;
  name: string;
  isActive: boolean;
}

export interface CreateMachineRequest {
  code: string;
  name: string;
}
