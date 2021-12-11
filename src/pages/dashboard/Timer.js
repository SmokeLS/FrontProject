import { useEffect, useState } from 'react';
import { toDate, format } from 'date-fns';
import { Typography } from '@mui/material';

export default function Timer({ profile }) {
  const [timer, setTimer] = useState(format(new Date(), 'HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(format(new Date(), 'HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Typography variant="caption" display="block">
      Текущее время: {timer}, UTC+3
    </Typography>
  );
}
