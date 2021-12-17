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
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array
};

export default function DialogError({ profile, posts }) {
  return (

  );
}