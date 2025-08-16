'use client';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
interface StarsProps {
  value: number;
  onChange: (v: number) => void;
}

export default function Stars({ value, onChange }: StarsProps) {
  return (
    <div>
      {[1,2,3,4,5].map((i) => (
        <IconButton key={i} onClick={() => onChange(i)} size="small" aria-label={`nota ${i}`}>
          {value >= i ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      ))}
    </div>
  );
}