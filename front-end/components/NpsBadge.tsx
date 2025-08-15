'use client';
import { Chip } from '@mui/material';

export default function NpsBadge({ nps }: { nps: number | null }) {
  if (nps === null || Number.isNaN(nps)) return <Chip label="—" />;
  const label = `${nps}`;
  const color = nps >= 50 ? 'success' : nps >= 0 ? 'warning' : 'error';
  return <Chip label={label} color={color as any} variant="outlined" />;
}