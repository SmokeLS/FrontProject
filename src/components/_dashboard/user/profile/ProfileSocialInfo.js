import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Link, Card, CardHeader, Stack, Box, Typography, Divider } from '@mui/material';
import Scrollbar from '../../../Scrollbar';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { EditDialog, CreateDialog } from '../../../../pages/dashboard/ContactDialog';

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
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('somethign@mail.ru');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, []);

  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardHeader title="Контакты" sx={{ mt: -1, mb: 1 }} />

        <CreateDialog
          profile={profile}
          setOpen={setOpen}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </Box>
      <Divider />
      <Scrollbar
        sx={{
          maxHeight: '275px',
          borderRadius: '10px',
          overflowX: 'hidden'
        }}
        scrollableNodeProps={{ ref: scrollRef }}
      >
        <Stack spacing={2} sx={{ p: 3 }}>
          {profile.contacts.map((contact, index) => (
            <Box key={index}>
              <Typography mr={-2} variant="body2">
                {profile.can_update_contacts ? (
                  <EditDialog
                    profile={profile}
                    isEdit
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                  />
                ) : (
                  <Typography component="span" mr={-2} variant="body2">
                    Контакт{' '}
                    <Typography component="span" variant="caption">
                      #2382
                    </Typography>
                  </Typography>
                )}
              </Typography>
              <Typography variant="body2" component="div">
                {contact.name}, {contact.position}
              </Typography>
              <Typography variant="body2" component="div">
                Email: {contact.email}
              </Typography>
              <Typography variant="body2" component="div">
                Телефон: {contact.phone}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
