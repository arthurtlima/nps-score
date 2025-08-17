'use client';
import { IconButton, useTheme } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
interface StarsProps {
  value: number;
  onChange: (rating: number) => void;
}

export default function Stars({ value, onChange }: StarsProps) {
  const theme = useTheme();

  const getColor = () => {
    if (value <= 2) return theme.palette.error.light;
    if (value === 3) return theme.palette.warning.light;
    return theme.palette.success.light;
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(rating => (
        <IconButton
          key={rating}
          onClick={() => onChange(rating)}
          size="small"
          aria-label={`nota ${rating}`}
          sx={{ color: value >= rating ? getColor() : 'inherit' }}
        >
          {value >= rating ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      ))}
    </div>
  );
}
