import { useParams } from 'react-router';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Button, TextField, Typography, FormHelperText, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import countries from './countries';
import { changeContacts, deleteContact, setContacts, getProfile } from '../../../redux/slices/user';
import { DeleteDialog } from '../../../pages/dashboard/DeleteDialog';

// ----------------------------------------------------------------------

UserContactForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserContactForm({ onClose, profile, isEdit, currentUser, contactId }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const params = useParams();
  const [openDelete, setOpenDelete] = useState(false);
  const contacts = useSelector((state) => state.user.profile.contacts);

  useEffect(() => {
    dispatch(getProfile(params.id));
  }, [contacts, dispatch, params]);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = (value) => {
    setOpenDelete(false);
  };

  const deleteHandler = () => {
    dispatch(deleteContact(contactId));
    setOpenDelete(false);
  };

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Обязательное поле'),
    position: Yup.string(),
    email: Yup.string().email(),
    phoneNumber: Yup.string()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || '',
      position: currentUser?.position || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (!isEdit) {
          dispatch(setContacts(values, profile.id));
        } else {
          dispatch(changeContacts(values, contactId));
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Контакт успешно создан' : 'Контакт успешно обновлен', { variant: 'success' });
        onClose();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {isEdit && (
          <Box sx={{ float: 'right', mt: -4, mr: 2 }}>
            {profile.can_destroy_contacts && (
              <>
                <Button onClick={handleClickOpenDelete}>Удалить</Button>
                <DeleteDialog
                  title="Вы уверены, что хотите удалить контакт?"
                  setOpen={setOpenDelete}
                  open={openDelete}
                  deleteHandler={deleteHandler}
                  onClose={handleCloseDelete}
                />
              </>
            )}
          </Box>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="ФИО"
                    placeholder="Иванов Иван Иванович"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Должность"
                    placeholder="Менеджер"
                    {...getFieldProps('position')}
                    error={Boolean(touched.position && errors.position)}
                    helperText={touched.position && errors.position}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Почта"
                    placeholder="email@gmail.com"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Номер телефона"
                    placeholder="+79190283535"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Создать контакт' : 'Сохранить изменения'}
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
