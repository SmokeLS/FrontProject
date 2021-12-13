import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { blue } from '@mui/material/colors';
import UserContactForm from '../../components/_dashboard/user/UserContactForm';
import { getProfile } from '../../redux/slices/user';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const currentUserContact = {
  name: 'Иванов Иван Иванович',
  position: 'Директор',
  email: 'something@mail.ru',
  phoneNumber: '88005553535'
};

export function SimpleDialog(props) {
  const { onClose, selectedValue, open, isEdit, profile } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {isEdit && <DialogTitle>Редактирование контакта</DialogTitle>}
      {!isEdit && <DialogTitle sx={{ mb: 2 }}>Создание нового контакта</DialogTitle>}
      <UserContactForm onClose={onClose} profile={profile} isEdit={isEdit} currentUser={currentUserContact} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export function CreateDialog({ profile, isEdit }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const dispatch = useDispatch();
  const params = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log(true);
    dispatch(getProfile(params.id));
  }, [dispatch, params, open]);

  return (
    <div>
      {profile.can_add_contacts && (
        <Button
          variant="body1"
          sx={{
            mr: 2,
            mb: 1,
            marginTop: '17px',
            textDecoration: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#3366FF'
          }}
          size="small"
          onClick={handleClickOpen}
        >
          Новый контакт
        </Button>
      )}
      <SimpleDialog profile={profile} isEdit={isEdit} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

export function EditDialog({ isEdit, profile, index }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Typography
        component="span"
        mr={-2}
        variant="body2"
        onClick={handleClickOpen}
        sx={{ cursor: 'pointer', color: '#3366FF' }}
      >
        Контакт{' '}
        <Typography component="span" variant="caption">
          #{index}
        </Typography>
      </Typography>
      <SimpleDialog profile={profile} isEdit={isEdit} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
}
