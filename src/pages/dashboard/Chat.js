import { useEffect } from 'react';
// material
import { Card, Container, styled } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { getConversations, getContacts } from '../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ChatSidebar, ChatWindow } from '../../components/_dashboard/chat';

// ----------------------------------------------------------------------

const ModifiedCard = styled(Card)(({ theme }) => ({
  height: 'calc(60vh - 100px)'
}));

export default function Chat({ profile }) {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Container disableGutters maxWidth={themeStretch ? false : 'xl'} pl={2}>
      <ModifiedCard sx={{ alignItems: 'stretch', display: 'flex' }}>
        <ChatWindow profile={profile} />
      </ModifiedCard>
    </Container>
  );
}
