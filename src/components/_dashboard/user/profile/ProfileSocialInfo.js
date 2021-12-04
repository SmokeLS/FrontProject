import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Link, Card, CardHeader, Stack, Button, Box, Typography, Divider } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ProfileSocialInfo.propTypes = {
  profile: PropTypes.object
};

export default function ProfileSocialInfo({ profile }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;
  const navigate = useNavigate();
  const location = useLocation();

  const CONTACTS = [
    {
      name: 'Иванов Иван Иванович',
      position: 'Директор',
      email: 'example@domain.com',
      tel: '+79854327365'
    },
    {
      name: 'Иванов Иван Иванович',
      position: 'Директор',
      email: 'example@domain.com',
      tel: '+79854327365'
    },
    {
      name: 'Иванов Иван Иванович',
      position: 'Директор',
      email: 'example@domain.com',
      tel: '+79854327365'
    },
    {
      name: 'Иванов Иван Иванович',
      position: 'Директор',
      email: 'example@domain.com',
      tel: '+79854327365'
    }
  ];

  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <CardHeader title="Контакты" sx={{ mr: 2 }} />
        <Typography
          variant="body1"
          sx={{ mr: 2, textDecoration: 'none', fontSize: '1.125rem' }}
          component={RouterLink}
          to={PATH_DASHBOARD.user.newUser}
        >
          Новый контакт
        </Typography>
      </Box>
      <Divider />
      <Stack spacing={2} sx={{ p: 3, maxHeight: '287px', overflowY: 'scroll' }}>
        {CONTACTS.map((contact, index) => (
          <Box key={index}>
            <Typography variant="body2">
              Контакт <Typography variant="caption">#2382</Typography>
              <Typography
                variant="body1"
                sx={{
                  float: 'right',
                  fontSize: '0.875rem',
                  textAlign: 'right',
                  width: 80,
                  color: '#0045FF',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  navigate(`/${location.pathname}/contact/1`);
                }}
                component="span"
              >
                Изменить
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  float: 'right',
                  fontSize: '0.875rem',
                  textAlign: 'right',
                  width: 80,
                  color: '#0045FF',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  navigate(`/${location.pathname}/contact/1`);
                }}
                component="span"
              >
                Удалить
              </Typography>
            </Typography>
            <Typography variant="body2" component="div">
              {contact.name}, {contact.position}
            </Typography>
            <Typography variant="body2" component="div">
              Email: {contact.email}
            </Typography>
            <Typography variant="body2" component="div">
              Телефон: {contact.tel}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
