import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import personFill from '@iconify/icons-eva/person-fill';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '150px',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white
}));

// ----------------------------------------------------------------------

const TOTAL = 38566;
const CHART_DATA = [44];

const switchNames = (name) => {
  switch (name) {
    case 'new_cards_count':
      return 'Новых карточек';
    case 'in_work_cards_count':
      return 'В работе';
    case 'today_date_cards_count':
      return 'Дата контакта - сегодня';
    case 'in_archive_cards_count':
      return 'В архиве';
    default:
      return '';
  }
};

export default function AppWidgetsStats({ userStat }) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize
          }
        }
      }
    }
  });

  return (
    <RootStyle>
      <Box sx={{ color: 'common.white', textAlign: 'center' }}>
        <Typography variant="h4"> {userStat[1]}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          {switchNames(userStat[0])}
        </Typography>
      </Box>
    </RootStyle>
  );
}
