import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// material
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  Autocomplete
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { getCities, getManagers, getRegions, setCompany } from '../../../redux/slices/user';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { managers, regions, cities } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const optionsManagers = managers.map((item) => ({ label: item.full_name, id: item.id }));
  const optionsRegions = regions.map((item) => ({ label: item.name, id: item.id }));
  const optionsCities = cities.map((item) => ({ label: item.name, id: item.id }));
  const NewUserSchema = Yup.object().shape({
    user: Yup.object(),
    name: Yup.string().required('Обязательное поле'),
    taxpayer_id: Yup.string().required('Обязательное поле'),
    region: Yup.object(),
    city: Yup.object(),
    date: Yup.string().required('Обязательное поле')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: '',
      name: '',
      taxpayer_id: '',
      region: '',
      city: '',
      date: ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        dispatch(setCompany(values));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Компания успешно добавлена', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    dispatch(getManagers());
    dispatch(getRegions());
    dispatch(getCities());
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Autocomplete
                    disablePortal
                    id="user"
                    name="user"
                    sx={{ width: '100%' }}
                    options={optionsManagers}
                    onChange={(e, value) => {
                      setFieldValue('user', value !== null ? value : optionsManagers.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        id="user"
                        label="Менеджер"
                        {...params}
                        sx={{ width: '100%' }}
                        {...getFieldProps('user')}
                      />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                  <TextField
                    fullWidth
                    label="Название"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="ИНН"
                    {...getFieldProps('taxpayer_id')}
                    error={Boolean(touched.taxpayer_id && errors.taxpayer_id)}
                    helperText={touched.taxpayer_id && errors.taxpayer_id}
                  />
                  <Autocomplete
                    disablePortal
                    id="region"
                    name="region"
                    sx={{ width: '100%' }}
                    options={optionsRegions}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(e, value) => {
                      setFieldValue('region', value !== null ? value : optionsManagers.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        label="Регион"
                        {...params}
                        id="region"
                        sx={{ width: '100%' }}
                        {...getFieldProps('region')}
                      />
                    )}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Autocomplete
                    disablePortal
                    id="city"
                    name="city"
                    sx={{ width: '100%' }}
                    options={optionsCities}
                    onChange={(e, value) => {
                      setFieldValue('city', value !== null ? value : optionsCities.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        id="city"
                        label="Город"
                        {...params}
                        sx={{ width: '100%' }}
                        {...getFieldProps('city')}
                      />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                  <TextField
                    fullWidth
                    label="Дата"
                    {...getFieldProps('date')}
                    error={Boolean(touched.date && errors.date)}
                    helperText={touched.date && errors.date}
                  />
                </Stack>

                <Box
                  sx={{ mt: 3, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', minHeight: '36vh' }}
                >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Создать карточку' : 'Сохранить изменения'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
