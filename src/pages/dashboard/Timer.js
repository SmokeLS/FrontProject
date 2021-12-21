import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Typography } from '@mui/material';

function isValidDate(d) {
  // eslint-disable-next-line no-restricted-globals
  return d instanceof Date && !isNaN(d);
}

export default function Timer({ profile }) {
  let hours = new Date().getUTCHours() + profile?.region?.timezone?.value;

  if (!isValidDate(hours)) {
    hours = new Date().getUTCHours();
  }

  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay(),
    hours,
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
        hours,
        new Date().getMinutes(),
        new Date().getSeconds()
      );

      setTimer(format(date, 'HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!profile?.region) return null;

  return (
    <Typography variant="caption" display="block">
      Текущее время: {timer}, {profile.region.timezone.name}
    </Typography>
  );
}
