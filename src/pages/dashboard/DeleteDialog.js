import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Stack } from '@mui/material';

export function DeleteDialog(props) {
  const { onClose, selectedValue, open, deleteHandler, title } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle mb={2}>{title}</DialogTitle>
      <Card sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-around" spacing={3}>
          <Button onClick={deleteHandler}>Да</Button>
          <Button onClick={handleClose}>Нет</Button>
        </Stack>
      </Card>
    </Dialog>
  );
}
