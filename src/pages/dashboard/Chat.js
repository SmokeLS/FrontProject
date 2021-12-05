import { useEffect } from 'react';
// material
import { Card, Container } from '@mui/material';
// redux
import { styled } from '@mui/material/styles';
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

export default function Chat() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title="Chat | Minimal-UI">
      <Container disableGutters maxWidth={themeStretch ? false : 'xl'} pl={2}>
        <Card sx={{ minHeight: '620px', display: 'flex' }}>
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
