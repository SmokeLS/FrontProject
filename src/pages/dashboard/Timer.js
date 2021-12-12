import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Typography } from '@mui/material';

export default function Timer({ profile }) {
  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay(),
    new Date().getUTCHours() + profile.region.timezone.value,
    new Date().getMinutes(),
    new Date().getSeconds()
  );

  const [timer, setTimer] = useState(format(date, 'HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDay(),
        new Date().getUTCHours() + profile.region.timezone.value,
        new Date().getMinutes(),
        new Date().getSeconds()
      );

      setTimer(format(date, 'HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography variant="caption" display="block">
      Текущее время: {timer}, {profile.region.timezone.name}
    </Typography>
  );
}
