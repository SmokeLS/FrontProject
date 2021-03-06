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
import { getChangedProfile, getCities, getSdManagers, getProfile, getAllRegions } from '../../redux/slices/user';
import UserContactForm from '../../components/_dashboard/user/UserContactForm';

export function CompanyDialog(props) {
  const { onClose, selectedValue, open, isEdit, profile } = props;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const params = useParams();
  const { sd_managers, allRegions, cities, allRegionsNoCities } = useSelector((state) => state.user);
  const [query, setQuery] = useState('');

  let regionStateValue;

  if (!profile.city) {
    regionStateValue = profile.region?.name;
  } else {
    regionStateValue = profile.city?.region?.name;
  }
  const [managers, setManagers] = useState(profile.user?.full_name);
  const [regions, setRegions] = useState(regionStateValue);
  const [city, setCity] = useState(profile.city?.name);

  const optionsManagers = sd_managers.map((item) => ({ label: item.full_name, id: item.id, key: item.id }));
  const optionsRegions = allRegions.map((item) => ({ label: item.name, id: item.id, key: item.id }));
  const optionsCities = cities.map((item) => ({ label: item.name, id: item.id, key: item.id }));

  useEffect(() => {
    if (!profile.city) {
      setRegions(profile.region?.name);
    } else {
      setRegions(profile.city?.region?.name);
    }
    setManagers(profile.user?.full_name);
    setCity(profile.city?.name);
    dispatch(getSdManagers());
    dispatch(getAllRegions());
    dispatch(getCities());
  }, [dispatch, params.id, profile]);

  useEffect(() => {
    dispatch(getCities(query, regions?.id));
  }, [query, dispatch, regions]);

  const companySchema = Yup.object().shape({
    name: Yup.string().required('???????????????????????? ????????'),
    taxpayer_id: Yup.string()
      .required('???????????????????????? ????????')
      .test(
        'len',
        '???????????? ???????? ???????????? ???????????????? ???? 10 ?????? 12 ??????????',
        // eslint-disable-next-line no-restricted-globals
        (val) => (val?.length === 10 || val?.length === 12) && !isNaN(val)
      )
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: profile.user || managers,
      name: profile.name,
      taxpayer_id: profile.taxpayer_id,
      region: profile?.region?.name || regions,
      city: profile?.city || city,
      address: profile.address
    },
    validationSchema: companySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await dispatch(getChangedProfile(profile.id, values));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('???????????????? ?????????????? ????????????????', { variant: 'success' });
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
      <DialogTitle mb={2}>???????????????? ????????????????</DialogTitle>
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
                    value={managers}
                    onChange={(e, value) => {
                      setManagers(value);
                      setFieldValue('user', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        id="user"
                        label="????????????????"
                        {...params}
                        sx={{ width: '100%' }}
                        {...getFieldProps('user')}
                      />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                  <TextField
                    label="???????????????? ????????????????"
                    {...getFieldProps('name')}
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    label="??????"
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
                    value={regions}
                    onChange={(e, value) => {
                      setRegions(value);
                      setFieldValue('region', value !== null ? value : '');
                    }}
                    onInputChange={(e, value) => console.log(value)}
                    renderInput={(params) => (
                      <TextField
                        label="????????????"
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
                    value={city}
                    sx={{ width: '100%' }}
                    onChange={(e, value) => {
                      setCity(value);
                      setFieldValue('city', value !== null ? value : '');
                    }}
                    renderOption={(props, option) => (
                      <Box {...props} key={option.id}>
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        id="city"
                        label="??????????"
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
                    label="??????????"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      ???????????????? ????????????????
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
