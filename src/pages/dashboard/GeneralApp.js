import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// material
import { Container, Grid, Stack, Typography } from '@mui/material';
// hooks
import axios from '../../utils/axios';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { AppWelcome, AppWidgetsStats } from '../../components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user, userStatistics } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    async function refresh() {
      const response = await axios.get('/api/v1/users/me/');

      const user = { ...response.data };

      const responseStatistics = await axios.get('api/v1/users/my_sd_statistics/');
      const userStatistics = { ...responseStatistics.data };

      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: true,
          user,
          userStatistics
        }
      });
    }
    refresh();
  }, [user, userStatistics, dispatch]);

  return (
    <Page title="General: App | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppWelcome displayName={user.full_name} />
          </Grid>

          {user.sd_access && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div">
                  Ваша статистика
                </Typography>
              </Grid>

              {Object.entries(userStatistics).map((userStat, index) => (
                <Grid key={index} item xs={12} md={6} lg={3}>
                  <AppWidgetsStats userStat={userStat} item xs={4} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
