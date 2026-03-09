
export interface DailyProduction {
  dailyProductionId: number;
  machineId: number;
  date: string;
  targetUnits: number;
  okUnits: number;
  defectUnits: number;
  isActive: boolean;
}

export interface DailyProductionCreate extends Omit<DailyProduction, 'dailyProductionId' | 'isActive'> {
}
