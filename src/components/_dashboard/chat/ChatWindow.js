import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// material
import { Box, Divider, Stack, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
  addRecipients,
  onSendMessage,
  getConversation,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation
} from '../../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import ChatRoom from './ChatRoom';
import ChatMessageList from './ChatMessageList';
import ChatHeaderDetail from './ChatHeaderDetail';
import ChatMessageInput from './ChatMessageInput';
import ChatHeaderCompose from './ChatHeaderCompose';

// ----------------------------------------------------------------------

const conversationSelector = (state) => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = activeConversationId ? conversations.byId[activeConversationId] : null;
  if (conversation) {
    return conversation;
  }
  const initState = {
    id: '',
    messages: [],
    participants: [],
    unreadCount: 0,
    type: ''
  };
  return initState;
};

export default function ChatWindow({ profile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { conversationKey } = useParams();
  const { activeConversationId } = useSelector((state) => state.chat);
  const conversation = useSelector((state) => conversationSelector(state));

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(conversationKey));
      try {
        await dispatch(getConversation(conversationKey));
      } catch (error) {
        console.error(error);
        navigate(PATH_DASHBOARD.chat.new);
      }
    };
    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleSendMessage = async (value) => {
    try {
      dispatch(onSendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) return null;

  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      <Box pt={3} pb={3} pl={3}>
        <Typography variant="body1" fontWeight="bold" fontSize="1.1rem">
          Комментарии
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>
          <ChatMessageList profile={profile} conversation={conversation} />
          <Divider />
          <ChatMessageInput
            profile={profile}
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            disabled={profile.can_add_comments}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
