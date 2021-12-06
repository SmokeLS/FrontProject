import * as React from 'react';
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
import { blue } from '@mui/material/colors';
import UserContactForm from '../../components/_dashboard/user/UserContactForm';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export function SimpleDialog(props) {
  const { onClose, selectedValue, open, isEdit } = props;
  const currentUserContact = {
    name: 'Иванов Иван Иванович',
    position: 'Директор',
    email: 'something@mail.ru',
    phoneNumber: '88005553535'
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {isEdit && <DialogTitle>Редактирование контакта</DialogTitle>}
      {!isEdit && <DialogTitle>Создание нового контакта</DialogTitle>}
      <UserContactForm isEdit={isEdit} currentUser={currentUserContact} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default function SimpleDialogDemo({ isEdit }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography
        variant="body1"
        sx={{
          mr: 2,
          marginTop: '17px',
          textDecoration: 'none',
          fontSize: '1.125rem',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
        onClick={handleClickOpen}
      >
        Новый контакт
      </Typography>
      <SimpleDialog isEdit={isEdit} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useLocation, useParams } from 'react-router';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
// import UserContactForm from '../../components/_dashboard/user/UserContactForm';

// export default function ContactDialog(props) {

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   return (
//     <Dialog onClose={handleClose} open={open}>
//       <UserContactForm isEdit={isEdit} currentUser={currentUserContact} />
//     </Dialog>
//     // <Dialog onClose={handleClose} open={open}>
//     //   <UserContactForm isEdit={isEdit} currentUser={currentUserContact} />
//     // </Dialog>
//   );
// }
