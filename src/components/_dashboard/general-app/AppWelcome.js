import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string
};

export default function AppWelcome({ displayName }) {
  const handleClickNavigate = () => {
    window.location.href = 'https://forms.yandex.ru/cloud/61a6795b621917842f4e23c4/';
    return null;
  };

  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        <Typography gutterBottom variant="h4" mt={3}>
          Добро пожаловать,
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          По вопросам, ксающихся работы системы просьба обращаться через форму. Так же вы можете писать на почту
          tpass-dev@yandex.ru, указывая тему обращения.
        </Typography>

        <Button variant="contained" target="_blank" to="#" onClick={handleClickNavigate} component={RouterLink}>
          Открыть форму
        </Button>
      </CardContent>
    </RootStyle>
  );
}
