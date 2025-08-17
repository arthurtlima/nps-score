'use client';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface NotificationProps {
  open: boolean;
  message: string;
  type: AlertColor; // 'success' | 'error' | 'warning' | 'info'
  onClose: () => void;
  duration?: number;
}

export default function Notification({
  open,
  message,
  type,
  onClose,
  duration = 4000,
}: NotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={type} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
