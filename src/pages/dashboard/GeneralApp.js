// material
import { Container, Grid, Stack, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { AppWelcome, AppWidgetsStats } from '../../components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user, userStatistics } = useAuth();
  console.log(userStatistics);
  // const state = useSelector(state => state.state);

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
