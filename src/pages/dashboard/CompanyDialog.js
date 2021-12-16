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
import { getChangedProfile, getCities, getManagers, getProfile, getRegions } from '../../redux/slices/user';
import UserContactForm from '../../components/_dashboard/user/UserContactForm';

export function CompanyDialog(props) {
  const { onClose, selectedValue, open, isEdit, profile } = props;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const params = useParams();
  const { managers, regions, cities } = useSelector((state) => state.user);

  const optionsManagers = managers.map((item) => ({ label: item.full_name, id: item.id }));
  const optionsRegions = regions.map((item) => ({ label: item.name, id: item.id }));
  const optionsCities = cities.map((item) => ({ label: item.name, id: item.id }));

  useEffect(() => {
    dispatch(getManagers());
    dispatch(getRegions());
    dispatch(getCities());
  }, []);

  const companySchema = Yup.object().shape({
    user: Yup.object(),
    name: Yup.string().required('Обязательное поле'),
    taxpayer_id: Yup.string().required('Обязательное поле'),
    region: Yup.object(),
    city: Yup.object(),
    address: Yup.string()
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
    validationSchema: companySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        dispatch(getChangedProfile(profile.id, values));
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

  console.log(errors);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
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
                    id="user_id"
                    name="user_id"
                    sx={{ width: '100%' }}
                    options={optionsManagers}
                    onChange={(e, value) => {
                      console.log(value);
                      setFieldValue('user', value !== null ? value : optionsManagers.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        id="user_id"
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
                    onChange={(e, value) => {
                      console.log(value);
                      setFieldValue('region', value !== null ? value : optionsManagers.id);
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
