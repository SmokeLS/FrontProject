import { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { DialogActions, DialogContent, DialogContentText, Slide, Stack } from '@mui/material';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export function DeleteDialog(props) {
  const { onClose, selectedValue, open, deleteHandler, title } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogActions sx={{ justifyContent: 'flex-start' }}>
        <Button variant="outlined" color="error" onClick={deleteHandler}>
          Удалить
        </Button>
        <Button onClick={handleClose}>Отмена</Button>
      </DialogActions>
    </Dialog>
  );
}
