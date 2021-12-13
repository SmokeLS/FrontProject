import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import micFill from '@iconify/icons-eva/mic-fill';
import roundSend from '@iconify/icons-ic/round-send';
import attach2Fill from '@iconify/icons-eva/attach-2-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { styled } from '@mui/material/styles';
import { Input, Divider, IconButton, InputAdornment, Stack } from '@mui/material';
//
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getProfile, setComments } from '../../../redux/slices/user';
import EmojiPicker from '../../EmojiPicker';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ChatMessageInput.propTypes = {
  disabled: PropTypes.bool,
  conversationId: PropTypes.string,
  onSend: PropTypes.func
};

export default function ChatMessageInput({ profile, disabled, conversationId, onSend, ...other }) {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const params = useParams();

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    dispatch(getProfile(params.id));
  }, [message, params, dispatch]);

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = (e) => {
    if (!message) {
      return '';
    }
    if (onSend) {
      dispatch(setComments(message, params.id));
    }
    return setMessage('');
  };

  return (
    <RootStyle {...other}>
      <Input
        disabled={!disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={handleChangeMessage}
        placeholder="Текст комментария"
        sx={{ height: '100%' }}
      />

      <Divider orientation="vertical" flexItem />

      <IconButton color="primary" disabled={!message} onClick={handleSend} sx={{ mx: 1 }}>
        <Icon icon={roundSend} width={24} height={24} />
      </IconButton>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </RootStyle>
  );
}
