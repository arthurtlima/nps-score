'use client';
import { Chip } from '@mui/material';
interface NpsBadgeProps {
  nps: number | null;
}

export default function NpsBadge({ nps }: NpsBadgeProps) {
  if (nps === null || Number.isNaN(nps)) return <Chip label="—" />;
  const label = `${nps}`;
  const color = nps >= 50 ? 'success' : nps >= 0 ? 'warning' : 'error';
  return <Chip label={label} color={color as any} variant="outlined" />;
}
