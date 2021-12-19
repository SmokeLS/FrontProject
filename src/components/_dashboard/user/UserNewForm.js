import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
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
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { getCities, getManagers, getAllRegions, setCompany, getSdManagers } from '../../../redux/slices/user';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { sd_managers, allRegions, cities, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [localRegion, setLocalRegion] = useState('');
  const isMountedRef = useIsMountedRef();

  const optionsManagers = sd_managers.map((item) => ({ label: item.full_name, id: item.id }));
  const optionsRegions = allRegions.map((item) => ({ label: item.name, id: item.id }));
  const optionsCities = cities.map((item) => ({ label: item.name, id: item.id }));
  const NewUserSchema = Yup.object().shape({
    user: Yup.object(),
    name: Yup.string().required('Обязательное поле'),
    taxpayer_id: Yup.string(),
    region: Yup.object(),
    city: Yup.object(),
    address: Yup.string().required('Обязательное поле')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: '',
      name: '',
      taxpayer_id: '',
      region: '',
      city: '',
      address: ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await dispatch(setCompany(values, navigate));
        throw error.response;
      } catch (error) {
        setSubmitting(false);
        setErrors({
          afterSubmit: error.data.detail,
          taxpayer_id: error.data.taxpayer_id,
          name: error.data.name,
          user: error.data.user,
          reion: error.data.region,
          city: error.data.city,
          address: error.data.address
        });
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    dispatch(getSdManagers());
    dispatch(getAllRegions());
    dispatch(getCities());
  }, []);

  useEffect(() => {
    dispatch(getCities(query, localRegion.id));
  }, [query, dispatch, localRegion]);

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
                        error={Boolean(errors.user)}
                        helperText={errors.user}
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
                    placeholder="3664069397"
                  />
                  <Autocomplete
                    disablePortal
                    id="region"
                    name="region"
                    sx={{ width: '100%' }}
                    options={optionsRegions}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(e, value) => {
                      setLocalRegion(value);
                      setFieldValue('region', value !== null ? value : optionsManagers.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        label="Регион"
                        {...params}
                        id="region"
                        error={Boolean(errors.region)}
                        helperText={errors.region}
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
                    getOptionLabel={(option) => option.label}
                    options={optionsCities}
                    sx={{ width: '100%' }}
                    onChange={(e, value) => {
                      setFieldValue('city', value !== null ? value : optionsCities.id);
                    }}
                    renderOption={(props, option) => (
                      <Box {...props} key={option.id}>
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        id="city"
                        label="Город"
                        error={Boolean(errors.city)}
                        helperText={errors.city}
                        sx={{ width: '100%' }}
                        {...getFieldProps('city')}
                        onChange={(e) => {
                          setQuery(e.target.value);
                        }}
                        {...params}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    label="Адрес"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>

                <FormHelperText error fontSize={18} sx={{ px: 2, textAlign: 'center' }}>
                  {errors.afterSubmit}
                </FormHelperText>

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
