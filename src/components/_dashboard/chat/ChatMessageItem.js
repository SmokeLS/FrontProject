import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
// material
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from '../../../redux/slices/user';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 640,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary
}));

const MessageImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  cursor: 'pointer',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up('md')]: {
    height: 200,
    minWidth: 296
  }
}));

// ----------------------------------------------------------------------

ChatMessageItem.propTypes = {
  message: PropTypes.string,
  conversation: PropTypes.object.isRequired,
  onOpenLightbox: PropTypes.func
};

export default function ChatMessageItem({ comment, message, conversation, onOpenLightbox }) {
  const user = useSelector((state) => state.user.me);
  const dispatch = useDispatch();
  const isMe = comment?.user?.id === user?.id;

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto'
          })
        }}
      >
        <div>
          <InfoStyle variant="caption" sx={{ ...(isMe && { justifyContent: 'flex-end' }) }}>
            {`${comment?.user?.full_name},`}&nbsp;
            {comment?.date_created}
          </InfoStyle>

          <ContentStyle>
            <Typography sx={{ wordBreak: 'break-all' }} variant="body2">
              {message}
            </Typography>
          </ContentStyle>
        </div>
      </Box>
    </RootStyle>
  );
}
