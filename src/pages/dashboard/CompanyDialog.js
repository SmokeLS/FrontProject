import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Form, FormikProvider, useFormik } from 'formik';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { blue } from '@mui/material/colors';
import { Autocomplete, Box, FormControl, Grid, RadioGroup, Stack, TextField } from '@mui/material';
import { getChangedProfile, getCities, getSdManagers, getProfile, getRegions } from '../../redux/slices/user';
import UserContactForm from '../../components/_dashboard/user/UserContactForm';

export function CompanyDialog(props) {
  const { onClose, selectedValue, open, isEdit, profile } = props;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const params = useParams();
  const { sd_managers, regions, cities } = useSelector((state) => state.user);
  const [query, setQuery] = useState('');

  const optionsManagers = sd_managers.map((item) => ({ label: item.full_name, id: item.id, key: item.id }));
  const optionsRegions = regions.map((item) => ({ label: item.name, id: item.id, key: item.id }));
  const optionsCities = cities.map((item) => ({ label: item.name, id: item.id, key: item.id }));

  useEffect(() => {
    dispatch(getSdManagers());
    dispatch(getRegions());
    dispatch(getCities());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCities(query));
  }, [query, dispatch]);

  const companySchema = Yup.object().shape({
    user: Yup.object(),
    name: Yup.string().required('Обязательное поле'),
    taxpayer_id: Yup.string()
      .required('Обязательное поле')
      .test(
        'len',
        'Данное поле должно состоять из 10 или 12 чисел',
        // eslint-disable-next-line no-restricted-globals
        (val) => (val?.length === 10 || val?.length === 12) && !isNaN(val)
      ),
    region: Yup.object(),
    city: Yup.object(),
    address: Yup.string()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: profile.user,
      name: profile.name,
      taxpayer_id: profile.taxpayer_id,
      region: profile.region.name,
      city: profile.city,
      address: profile.address
    },
    validationSchema: companySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log(values);
        await dispatch(getChangedProfile(profile.id, values));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Компания успешно изменена', { variant: 'success' });
        onClose();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle mb={2}>Изменить компанию</DialogTitle>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3, width: 560 }}>
                <Stack spacing={3}>
                  <Autocomplete
                    disablePortal
                    id="user"
                    name="user"
                    sx={{ width: '100%' }}
                    options={optionsManagers}
                    value={profile.user.full_name}
                    onChange={(e, value) => setFieldValue('user', value)}
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
                    label="Название компании"
                    {...getFieldProps('name')}
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    label="ИНН"
                    {...getFieldProps('taxpayer_id')}
                    error={Boolean(touched.taxpayer_id && errors.taxpayer_id)}
                    helperText={touched.taxpayer_id && errors.taxpayer_id}
                  />
                  <Autocomplete
                    disablePortal
                    id="region_id"
                    name="region_id"
                    sx={{ width: '100%' }}
                    options={optionsRegions}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={profile.city.region.name}
                    onChange={(e, value) => {
                      setFieldValue('region', value !== null ? value : optionsRegions.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        label="Регион"
                        {...params}
                        id="region_id"
                        sx={{ width: '100%' }}
                        {...getFieldProps('region')}
                      />
                    )}
                  />

                  <Autocomplete
                    disablePortal
                    id="city"
                    name="city"
                    options={optionsCities}
                    value={profile.city.name}
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

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Изменить компанию
                    </LoadingButton>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
