export interface NpsRow {
  id: string;
  name: string;
  nps: number | null;
  promoters: number;
  neutrals: number;
  detractors: number;
  total: number;
}

export interface NpsBreakdown {
  nps: number | null;
  promoters: number;
  neutrals: number;
  detractors: number;
  total: number;
}
