import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router';
import { List, ListItem, Autocomplete, Stack, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { getChangedEmployee, getManagedGroupsList } from '../../redux/slices/user';

export default function EditEmployeeDialog({ employee, openDialog, handleClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const params = useParams();
  const { managedGroups } = useSelector((state) => state.user);
  const position = managedGroups.filter((item) => item.id === employee.position.id);
  const managedOptions = managedGroups.map((item) => ({ label: item.name, id: item.id }));

  useEffect(() => {
    dispatch(getManagedGroupsList());
  }, [dispatch]);

  const [group, setGroup] = useState(employee.position.name);

  const EditSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    surname: Yup.string().required('Обязательное поле'),
    name: Yup.string().required('Обязательное поле'),
    patronymic: Yup.string(),
    phone: Yup.string(),
    email: Yup.string(),
    position: Yup.object().nullable(),
    number: Yup.string(),
    series: Yup.string(),
    issued: Yup.string(),
    // date: Yup.string(),
    code: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      username: employee.username || '',
      full_name: employee.full_name || '',
      surname: employee.surname || '',
      name: employee.name || '',
      patronymic: employee.patronymic || '',
      phone: employee.phone || '',
      email: employee.email || '',
      position: employee.position,
      number: employee.passport_number || '',
      series: employee.passport_series || '',
      issued: employee.passport_issued || '',
      date: employee.passport_date || null,
      code: employee.passport_code || ''
    },
    // validationSchema: EditSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await dispatch(getChangedEmployee(params.id, values));
        enqueueSnackbar('Update event success', { variant: 'success' });
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>Изменить карточку сотрудника</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <List>
                <ListItem>
                  <Typography variant="body1" sx={{ width: '200px' }}>
                    Username:
                  </Typography>
                  <TextField
                    id="username"
                    label="Username"
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
                    isOptionEqualToValuе
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
            <LoadingButton onClick={handleClose} type="submit" variant="contained" loading={isSubmitting}>
              Изменить
            </LoadingButton>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
