import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
// material
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object
};

export default function ProfileAbout({ profile }) {
  const { follower } = profile;

  console.log(profile);

  return (
    <Card>
      <CardHeader title="Информация" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            ИНН
            <Typography variant="body1" component="span">
              : {follower}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction="row">
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            Регион
            <Typography variant="body1" component="span">
              : Самарская область
            </Typography>
          </Typography>
        </Stack>

        <Stack direction="row">
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            Город
            <Typography variant="body1" component="span">
              : Самара
            </Typography>
          </Typography>
        </Stack>

        <Stack direction="row">
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            Адрес
            <Typography variant="body1" component="span">
              : Ставропольский район, Приморский поселок, ясная улица, дом 7
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
