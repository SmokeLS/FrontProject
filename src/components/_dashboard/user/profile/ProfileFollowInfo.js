/* eslint-disable no-debugger */
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
// material
import { Stack, Typography } from '@mui/material';
// utils
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setStatus, setDate, getProfile } from '../../../../redux/slices/user';

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.object
};

export default function ProfileFollowInfo({ profile }) {
  const [localStatus, setLocalStatus] = useState(profile.status);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const formatedValueDates = profile.date.split(' ')[0].split('.').reverse().join('.');
    const formatedValue = `${formatedValueDates} ${profile.date.split(' ')[1]}`;
    setValue(format(new Date(formatedValue), "yyyy-MM-dd'T'HH:mm"));
  }, []);

  const handleChange = (id, event) => {
    console.log(event.target.value);
    setLocalStatus(event.target.value);
    dispatch(setStatus(id, event.target.value));
  };

  const handleChangeDate = (id, e) => {
    console.log(e.target.value);
    setValue(e.target.value);
    dispatch(setDate(id, format(new Date(e.target.value), 'dd.MM.yyyy HH:mm'), e.target.value));
  };

  return (
    <>
      <Stack direction="row">
        <Stack textAlign="center">
          <Typography variant="body2" sx={{ color: '#00AB55', textAlign: 'left' }}>
            Текущий статус
          </Typography>
          <Box mr={1} sx={{ width: 230 }}>
            <FormControl fullWidth>
              <Select
                sx={{ textAlign: 'left', height: '40px', width: 230 }}
                labelId="status-select-label"
                id="status-select"
                value={localStatus}
                disabled={!profile.can_update_status}
                onChange={(e) => handleChange(params.id, e)}
              >
                {profile.can_set_status_in_archive && <MenuItem value={0}>В архиве</MenuItem>}
                {profile.can_set_status_new && <MenuItem value={1}>Новый</MenuItem>}
                {profile.can_set_status_in_work && <MenuItem value={2}>В работе</MenuItem>}
              </Select>
            </FormControl>
          </Box>
        </Stack>

        {profile.can_view_date && (
          <Stack textAlign="center">
            <Typography variant="body2" pl={1} sx={{ color: '#3366FF', textAlign: 'left' }}>
              Дата контакта
            </Typography>
            <Box ml={1}>
              <FormControl fullWidth>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  size="small"
                  sx={{ width: 230 }}
                  value={value}
                  onChange={(e) => handleChangeDate(params.id, e)}
                  disabled={!profile.can_update_contacts}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </FormControl>
            </Box>
          </Stack>
        )}
      </Stack>
    </>
  );
}
