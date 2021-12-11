import PropTypes from 'prop-types';
// material
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';
import Chat from '../../../../pages/dashboard/Chat';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array
};

export default function Profile({ profile, posts }) {
  return (
    <Grid container spacing={3} sx={{ height: '800px' }}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileAbout profile={profile} />
          {profile.can_view_contacts && <ProfileSocialInfo profile={profile} />}
        </Stack>
      </Grid>

      {profile.can_view_comments && (
        <Grid item xs={12} md={8}>
          <Chat profile={profile} />
        </Grid>
      )}
    </Grid>
  );
}
