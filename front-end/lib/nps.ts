export type NpsBreakdown = {
  nps: number | null;
  promoters: number;
  neutrals: number;
  detractors: number;
  total: number;
};

export function computeNpsFromCounts({ promoters, neutrals, detractors, total }: NpsBreakdown) {
  if (!total) return null;
  return Math.round(((promoters / total) * 100 - (detractors / total) * 100) * 100) / 100;
}
