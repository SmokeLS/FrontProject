import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// material
import * as Yup from 'yup';
import { Autocomplete, Container, Grid, List, ListItem, Stack, TextField, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { Form, FormikProvider, useFormik } from 'formik';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getChangedEmployee,
  getEmployee,
  getManagedGroupsList,
  getUserList,
  setEmployee
} from '../../redux/slices/user';
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function EmployeeCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { userList } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');
  const currentUser = userList.find((user) => paramCase(user.name) === name);
  const params = useParams();
  const { managedGroups } = useSelector((state) => state.user);
  const { employee } = useSelector((state) => state.user);
  const position = managedGroups.filter((item) => item.id === employee?.position?.id);
  const managedOptions = managedGroups.map((item) => ({ label: item.name, id: item.id }));

  useEffect(() => {
    dispatch(getManagedGroupsList());
  }, [dispatch]);

  const [group, setGroup] = useState();

  const EditSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    surname: Yup.string().required('Обязательное поле'),
    name: Yup.string().required('Обязательное поле'),
    patronymic: Yup.string(),
    phone: Yup.string(),
    email: Yup.string(),
    position: Yup.object(),
    number: Yup.string(),
    series: Yup.string(),
    issued: Yup.string(),
    date: Yup.string().nullable(),
    code: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      full_name: '',
      surname: '',
      name: '',
      patronymic: '',
      phone: '',
      email: '',
      position: '',
      number: '',
      series: '',
      issued: '',
      date: null,
      code: ''
    },
    validationSchema: EditSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await dispatch(setEmployee(values, navigate));
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Создание карточки сотрудника' : 'Редактирование карточки сотрудника'}
          links={[
            { name: 'Сотрудники', href: PATH_DASHBOARD.root },
            { name: 'Все сотрудники', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'Добавить сотрудника' : name }
          ]}
        />
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3} sx={{ p: 3 }}>
                    <List>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Имя пользователя:
                        </Typography>
                        <TextField
                          id="username"
                          label="Имя пользователя"
                          variant="outlined"
                          {...getFieldProps('username')}
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Фамилия:
                        </Typography>
                        <TextField
                          id="surname"
                          label="Фамилия"
                          variant="outlined"
                          {...getFieldProps('surname')}
                          error={Boolean(touched.surname && errors.surname)}
                          helperText={touched.surname && errors.surname}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Имя:
                        </Typography>
                        <TextField
                          id="name"
                          label="Имя"
                          variant="outlined"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Отчество:
                        </Typography>
                        <TextField
                          id="patronymic"
                          label="Отчество"
                          variant="outlined"
                          {...getFieldProps('patronymic')}
                          error={Boolean(touched.patronymic && errors.patronymic)}
                          helperText={touched.patronymic && errors.patronymic}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Телефон:
                        </Typography>
                        <TextField
                          id="phone"
                          label="Телефон"
                          variant="outlined"
                          {...getFieldProps('phone')}
                          error={Boolean(touched.phone && errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Почта:
                        </Typography>
                        <TextField
                          id="email"
                          label="Почта"
                          variant="outlined"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Должность:
                        </Typography>
                        <Autocomplete
                          disablePortal
                          id="position"
                          name="position"
                          sx={{ width: '220px' }}
                          options={managedOptions}
                          value={group}
                          onChange={(e, value) => {
                            setGroup(value);
                            setFieldValue('position', value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              id="position"
                              label="Должность"
                              {...params}
                              sx={{ width: '100%' }}
                              {...getFieldProps('position')}
                            />
                          )}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Паспорт номер:
                        </Typography>
                        <TextField
                          id="number"
                          label="Номер"
                          variant="outlined"
                          {...getFieldProps('number')}
                          error={Boolean(touched.number && errors.number)}
                          helperText={touched.number && errors.number}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Паспорт серия:
                        </Typography>
                        <TextField
                          id="series"
                          label="Серия"
                          variant="outlined"
                          {...getFieldProps('series')}
                          error={Boolean(touched.series && errors.series)}
                          helperText={touched.series && errors.series}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Паспорт кем выдан:
                        </Typography>
                        <TextField
                          id="issued"
                          label="Кем выдан"
                          variant="outlined"
                          {...getFieldProps('issued')}
                          error={Boolean(touched.issued && errors.issued)}
                          helperText={touched.issued && errors.issued}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Паспорт когда выдан:
                        </Typography>
                        <TextField
                          id="date"
                          label="Когда выдан"
                          variant="outlined"
                          placeholder="YYYY-MM-DD"
                          {...getFieldProps('date')}
                          error={Boolean(touched.date && errors.date)}
                          helperText={touched.date && errors.date}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" sx={{ width: '200px' }}>
                          Паспорт код подразделения:
                        </Typography>
                        <TextField
                          id="code"
                          label="Код подразделения"
                          variant="outlined"
                          {...getFieldProps('code')}
                          error={Boolean(touched.code && errors.code)}
                          helperText={touched.code && errors.code}
                        />
                      </ListItem>
                    </List>
                  </Stack>
                  <LoadingButton sx={{ marginLeft: '40px' }} type="submit" variant="contained" loading={isSubmitting}>
                    Создать
                  </LoadingButton>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
