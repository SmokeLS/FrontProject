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
import { Tab, Box, Card, Tabs, Container, Typography, Grid } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPosts, getGallery, getFriends, getProfile, getFollowers, onToggleFollow } from '../../redux/slices/user';
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

// ----------------------------------------------------------------------

export default function UserId() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { myProfile, posts, followers, friends, gallery } = useSelector((state) => state.user);
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('Комментарии');
  const [findFriends, setFindFriends] = useState('');

  const params = useParams();

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
          heading={`Карточка компании #${params.id}`}
          links={[
            { name: 'Отдел продаж', href: PATH_DASHBOARD.root },
            { name: 'Все компании', href: PATH_DASHBOARD.user.list },
            { name: `Карточка компании #${params.id}` }
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 200,
            position: 'relative'
          }}
        >
          <Box>
            <Box>
              <Box sx={{ pl: 3, pt: 3, zIndex: 200, position: 'relative' }}>
                <Typography variant="h5">OOO "ГИМА"</Typography>
                <Typography variant="caption" display="block">
                  Текущее время: 13:50:34, UTC+3
                </Typography>
              </Box>
            </Box>
            <Box sx={{ pl: 3, pt: 3, zIndex: 200, position: 'relative' }}>
              <ProfileFollowInfo profile={myProfile} />
            </Box>
          </Box>
          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
