import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import DateTimePicker from '@mui/lab/DateTimePicker';
import PropTypes from 'prop-types';
// material
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import { format } from 'date-fns';

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.object
};

export default function ProfileFollowInfo({ profile }) {
  const [status, setStatus] = React.useState(profile.status);
  const [value, setValue] = React.useState(format(new Date(profile.date), "yyyy-MM-dd'T'HH:mm"));

  const handleChange = (event) => {
    setStatus(event.target.value);
    setValue(profile.date);
  };

  const handleChangeDate = (newValue) => {
    setValue(newValue);
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
                value={status}
                disabled={!profile.can_update_status}
                onChange={handleChange}
              >
                {profile.can_set_status_in_archive && <MenuItem value={0}>В архиве</MenuItem>}
                {profile.can_set_status_in_work && <MenuItem value={1}>В работе</MenuItem>}
                {profile.can_set_status_new && <MenuItem value={2}>Новый</MenuItem>}
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
                  defaultValue={value}
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
