import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import PropTypes from 'prop-types';
// material
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.object
};

export default function ProfileFollowInfo({ profile }) {
  const { follower, following } = profile;

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [value, setValue] = React.useState();

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack textAlign="center">
          <Typography variant="body2" pl={2} sx={{ color: '#00AB55', textAlign: 'left' }}>
            Текущий статус
          </Typography>
          <Box ml={2} sx={{ width: 160 }}>
            <FormControl fullWidth>
              <Select
                sx={{ textAlign: 'left', height: '40px' }}
                labelId="status-select-label"
                id="status-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Новый</MenuItem>
                <MenuItem value={20}>В работе</MenuItem>
                <MenuItem value={30}>В архиве</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack textAlign="center">
          <Typography variant="body2" pl={2} sx={{ color: '#3366FF', textAlign: 'left' }}>
            Дата контакта
          </Typography>
          <Box ml={2} sx={{ width: 160 }}>
            <FormControl fullWidth>
              <OutlinedInput
                id="outlined-adornment-weight"
                value={value}
                onChange={handleChange}
                aria-describedby="outlined-weight-helper-text"
                sx={{ height: '40px' }}
              />
            </FormControl>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
