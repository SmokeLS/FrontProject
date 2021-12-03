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
          <Typography variant="body2">ИНН: {follower}</Typography>
        </Stack>

        <Stack direction="row">
          <Typography variant="body2">Регион: Самарская область</Typography>
        </Stack>

        <Stack direction="row">
          <Typography variant="body2">Город: Самара</Typography>
        </Stack>

        <Stack direction="row">
          <Typography variant="body2">Адрес: Ставропольский район, Приморский поселок, ясная улица, дом 7</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
