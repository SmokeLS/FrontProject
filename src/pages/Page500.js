import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// material
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <RootStyle title="500 Internal Server Error | Minimal-UI">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            500
          </Typography>
          <Typography variant="h3" paragraph>
            Внутренняя ошибка сервера
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} mb={5}>
            Попробуйте зайти позже.
          </Typography>

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            На Главную
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
