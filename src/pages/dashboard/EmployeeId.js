import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import heartFill from '@iconify/icons-eva/heart-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import roundAccountBox from '@iconify/icons-ic/round-account-box';

// material
import { styled } from '@mui/material/styles';
import {
  Tab,
  Box,
  Card,
  Tabs,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getPosts,
  getGallery,
  getFriends,
  getProfile,
  getFollowers,
  onToggleFollow,
  getUserList
} from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers
} from '../../components/_dashboard/user/profile';
import ProfileFollowInfo from '../../components/_dashboard/user/profile/ProfileFollowInfo';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

// ----------------------------------------------------------------------

export default function EmployeeId() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { myProfile, posts, followers, friends, gallery, userList } = useSelector((state) => state.user);
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('Комментарии');
  const [findFriends, setFindFriends] = useState('');

  const params = useParams();

  const filteredUser = userList.filter((item) => item.id === params.id);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getPosts());
    dispatch(getFollowers());
    dispatch(getFriends());
    dispatch(getGallery());
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleToggleFollow = (followerId) => {
    dispatch(onToggleFollow(followerId));
  };

  const handleFindFriends = (event) => {
    setFindFriends(event.target.value);
  };

  if (!myProfile) {
    return null;
  }

  const PROFILE_TABS = [
    {
      value: 'Комментарии',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Profile myProfile={myProfile} posts={posts} />
    },
    {
      value: 'Авто',
      icon: <Icon icon={roundPermMedia} width={20} height={20} />,
      component: <ProfileGallery gallery={gallery} />
    }
  ];
  return (
    <Page title="User: Profile | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={`Карточка сотрудника #${params.id}`}
          links={[
            { name: 'Система', href: PATH_DASHBOARD.root },
            { name: 'Все сотрудники', href: PATH_DASHBOARD.user.list },
            { name: `Карточка сотрудника #${params.id}` }
          ]}
        />
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            <Stack spacing={2} direction="row">
              <Button variant="outlined">Заблокировать</Button>
              <Button variant="outlined">Изменить</Button>
              <Button variant="outlined">Удалить</Button>
            </Stack>
          </Typography>
          {filteredUser && (
            <Demo>
              <List>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Username:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].name}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Фамилия:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].name}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Имя:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].name}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Отчество:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].name}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Телефон:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].phoneNumber}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Почта:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].email}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Должность:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].role}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Паспорт номер:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].zipCode}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Паспорт серия:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].zipCode}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Паспорт кем выдан:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].zipCode}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Паспорт когда выдан:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].zipCode}`} />
                </ListItem>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Паспорт код подразделения:
                  </Typography>
                  <ListItemText primary={`${filteredUser[0].zipCode}`} />
                </ListItem>
              </List>
            </Demo>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
