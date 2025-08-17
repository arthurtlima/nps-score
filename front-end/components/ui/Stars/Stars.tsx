// components/Stars.tsx
'use client';
import { IconButton, useTheme } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface StarsProps {
  value: number;
  onChange: (rating: number) => void;
  readOnly?: boolean;
}

export default function Stars({ value, onChange, readOnly = false }: StarsProps) {
  const theme = useTheme();

  const getColor = () => {
    if (value <= 2) return theme.palette.error.light;
    if (value === 3) return theme.palette.warning.light;
    return theme.palette.success.light;
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(rating =>
        readOnly ? (
          <span key={rating} style={{ color: value >= rating ? getColor() : 'inherit' }}>
            {value >= rating ? <StarIcon /> : <StarBorderIcon />}
          </span>
        ) : (
          <IconButton
            key={rating}
            onClick={() => onChange(rating)}
            size="small"
            sx={{ color: value >= rating ? getColor() : 'inherit' }}
          >
            {value >= rating ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        )
      )}
    </div>
  );
}
