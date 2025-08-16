'use client';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
interface StarsProps {
  value: number;
  onChange: (rating: number) => void;
}

export default function Stars({ value, onChange }: StarsProps) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(rating => (
        <IconButton
          key={rating}
          onClick={() => onChange(rating)}
          size="small"
          aria-label={`nota ${rating}`}
        >
          {value >= rating ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      ))}
    </div>
  );
}
