import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Container, Typography, Grid, List, ListItem, ListItemText, Button, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getEmployee, blockEmployee, deleteEmployee } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import EditEmployeeDialog from './EditEmployeeDialog';

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
  const navigate = useNavigate();
  const { employee } = useSelector((state) => state.user);
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState('Комментарии');
  const [findFriends, setFindFriends] = useState('');

  const params = useParams();

  useEffect(() => {
    dispatch(getEmployee(params.id));
  }, [dispatch, params]);

  const blockHandler = () => {
    dispatch(blockEmployee(params.id, employee));
  };

  const deleteHandler = () => {
    navigate(PATH_DASHBOARD.employee.list);
    dispatch(deleteEmployee(params.id));
  };

  const openEditDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  if (!employee) {
    return null;
  }

  if (employee.id !== +params.id) {
    return null;
  }

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
              <Button onClick={blockHandler} variant="outlined">
                Заблокировать
              </Button>
              <Button onClick={openEditDialog} variant="outlined">
                Изменить
              </Button>
              <EditEmployeeDialog employee={employee} openDialog={openDialog} handleClose={handleClose} />
              <Button onClick={deleteHandler} variant="outlined">
                Удалить
              </Button>
            </Stack>
          </Typography>
          <Demo>
            <List>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Username:
                </Typography>
                <ListItemText primary={`${employee.username}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Фамилия:
                </Typography>
                <ListItemText primary={`${employee.surname}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Имя:
                </Typography>
                <ListItemText primary={`${employee.name}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Отчество:
                </Typography>
                <ListItemText primary={`${employee.patronymic}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Телефон:
                </Typography>
                <ListItemText primary={`${employee.contact_phone}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Почта:
                </Typography>
                <ListItemText primary={`${employee.contact_email}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Должность:
                </Typography>
                <ListItemText primary={`${employee.position.name}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Паспорт номер:
                </Typography>
                <ListItemText primary={`${employee.passport_number}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Паспорт серия:
                </Typography>
                <ListItemText primary={`${employee.passport_series}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Паспорт кем выдан:
                </Typography>
                <ListItemText primary={`${employee.passport_issued}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Паспорт когда выдан:
                </Typography>
                <ListItemText primary={`${employee.passport_date}`} />
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ width: '200px' }}>
                  Паспорт код подразделения:
                </Typography>
                <ListItemText primary={`${employee.passport_code}`} />
              </ListItem>
            </List>
          </Demo>
        </Grid>
      </Container>
    </Page>
  );
}
