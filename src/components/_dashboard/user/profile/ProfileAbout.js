import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
import { useParams } from 'react-router-dom';
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
  let regionInformation;
  const params = useParams();

  if (!profile) return null;

  if (!profile.city) {
    regionInformation = (
      <Stack direction="row">
        <Typography sx={{ fontWeight: 'bold' }} variant="body1">
          Регион
          <Typography variant="body1" component="span">
            : {profile?.region?.name}
          </Typography>
        </Typography>
      </Stack>
    );
  } else {
    regionInformation = (
      <>
        <Stack direction="row">
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            Регион
            <Typography variant="body1" component="span">
              : {profile?.city?.region.name}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction="row">
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            Город
            <Typography variant="body1" component="span">
              : {profile?.city.name}
            </Typography>
          </Typography>
        </Stack>
      </>
    );
  }

  return (
    <Card>
      <CardHeader title="Информация" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 'bold' }} variant="body1">
          ID
          <Typography variant="body1" component="span">
            : {params?.id}
          </Typography>
        </Typography>

        <Typography sx={{ fontWeight: 'bold' }} variant="body1">
          Manager
          <Typography variant="body1" component="span">
            : {profile?.user?.full_name}
          </Typography>
        </Typography>

        <Stack direction="row">
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            ИНН
            <Typography variant="body1" component="span">
              : {profile?.taxpayer_id}
            </Typography>
          </Typography>
        </Stack>

        {regionInformation}

        <Stack direction="row">
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            Адрес
            <Typography variant="body1" component="span">
              : {profile?.address}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
