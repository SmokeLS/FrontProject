import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Typography, Button } from '@mui/material';
// redux

import { useDispatch, useSelector } from '../../redux/store';
import {
  getGallery,
  getFriends,
  getProfile,
  getFollowers,
  onToggleFollow,
  deleteCompany
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
import Timer from './Timer';
import { CompanyDialog } from './CompanyDialog';
import { DeleteDialog } from './DeleteDialog';

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
  const { profile, posts, followers, friends, gallery } = useSelector((state) => state.user);
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('Комментарии');
  const [findFriends, setFindFriends] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [openChange, setOpenChange] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleClickOpenChange = () => {
    setOpenChange(true);
  };

  const handleCloseChange = (value) => {
    setOpenChange(false);
    setSelectedValue(value);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = (value) => {
    setOpenDelete(false);
  };

  const params = useParams();

  useEffect(() => {
    dispatch(getProfile(params.id));
    // dispatch(getPosts());
    // dispatch(getFollowers());
    // dispatch(getFriends());
    // dispatch(getGallery());
  }, [dispatch, params]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleToggleFollow = (followerId) => {
    dispatch(onToggleFollow(followerId));
  };

  const handleFindFriends = (event) => {
    setFindFriends(event.target.value);
  };

  const deleteHandler = () => {
    navigate(PATH_DASHBOARD.user.list);
    dispatch(deleteCompany(params.id));
  };

  const PROFILE_TABS = [
    {
      value: 'Комментарии',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Profile profile={profile} posts={posts} />
    }
    // {
    //   value: 'Авто',
    //   icon: <Icon icon={roundPermMedia} width={20} height={20} />,
    //   component: <ProfileGallery gallery={gallery} />
    // }
  ];

  if (!profile) return null;
  return (
    <Page title="User: Profile | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
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
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h5">{profile.name}</Typography>
                  <Box mr={1}>
                    {profile.can_update_company && (
                      <>
                        <Button
                          variant="body1"
                          sx={{
                            color: '#0045FF',
                            cursor: 'pointer'
                          }}
                          size="small"
                          onClick={handleClickOpenChange}
                        >
                          Изменить
                        </Button>
                        <CompanyDialog
                          profile={profile}
                          setOpen={setOpenChange}
                          selectedValue={selectedValue}
                          open={openChange}
                          onClose={handleCloseChange}
                        />
                      </>
                    )}
                    {profile.can_update_company && (
                      <>
                        <Button
                          variant="body1"
                          sx={{
                            color: '#0045FF',
                            cursor: 'pointer'
                          }}
                          onClick={handleClickOpenDelete}
                        >
                          Удалить
                        </Button>
                        <DeleteDialog
                          title="Вы уверены, что хотите удалить компанию?"
                          setOpen={setOpenDelete}
                          open={openDelete}
                          deleteHandler={deleteHandler}
                          onClose={handleCloseDelete}
                        />
                      </>
                    )}
                  </Box>
                </Box>
                <Timer profile={profile} />
              </Box>
            </Box>
            <Box sx={{ pl: 3, pt: 3, zIndex: 200, position: 'relative' }}>
              <ProfileFollowInfo profile={profile} />
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
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={tab.value} />
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
