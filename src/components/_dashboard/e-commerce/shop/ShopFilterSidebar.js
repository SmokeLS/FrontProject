/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import searchFill from '@iconify/icons-eva/search-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  TextField,
  Paper
} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
//
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { useTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { filter, includes, orderBy } from 'lodash-es';
import useSettings from '../../../../hooks/useSettings';
import { MIconButton } from '../../../@material-extend';
import Scrollbar from '../../../Scrollbar';
import ColorManyPicker from '../../../ColorManyPicker';
import { filterProducts, getProducts } from '../../../../redux/slices/product';
import { getUserList, getManagers, getRegions } from '../../../../redux/slices/user';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' }
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['Любой', 'В архиве', 'В работе', 'Новый'];
export const FILTER_MANAGERS_OPTIONS = ['В архиве', 'В работе', 'Новый'];
export const EMPTY = { id: '', full_name: '' };
export const FILTER_REGIONS_OPTIONS = ['region1', 'region2'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' }
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object
};

const SearchStyleDouble = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 240, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 510,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 560, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function ShopFilterSidebar(props) {
  const { isOpenFilter, onResetFilter, onOpenFilter, onCloseFilter, formik, filterName, handleFunctions, newFilters } =
    props;
  const { values, getFieldProps } = formik;
  const { managers, regions } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getManagers());
  }, []);

  useEffect(() => {
    dispatch(getRegions());
  }, []);

  const isValidId = (id) => {
    if (!id) return '';
    return id;
  };

  const changeNameHandleSearch = (e) => {
    const allFilters = {
      user: `&user=${isValidId(filterName.user.id)}`,
      name: `&name=${e.target.value}`,
      taxpayerId: `&taxpayer_id=${filterName.taxpayerId}`,
      status: `&status=${filterName.status}`,
      dateBefore: `&date_before=${filterName.dateBefore}`,
      dateAfter: `&date_after=${filterName.dateAfter}`,
      region: `&region=${isValidId(filterName.region.id)}`,
      comments: `&text=${filterName.comments}`,
      commentsDateFrom: `&comments_date_from=${filterName.commentsDateFrom}`,
      commentsDateTo: `&comments_date_to=${filterName.commentsDateTo}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    dispatch(getUserList(5, 0, newFilter));

    handleFunctions.handleFilterByName({
      ...filterName,
      name: e.target.value
    });
  };

  const changeNumberHandleSearch = (e) => {
    const allFilters = {
      user: `&user=${isValidId(filterName.user.id)}`,
      name: `&name=${filterName.name}`,
      taxpayerId: `&taxpayer_id=${e.target.value}`,
      status: `&status=${filterName.status}`,
      dateBefore: `&date_before=${filterName.dateBefore}`,
      dateAfter: `&date_after=${filterName.dateAfter}`,
      region: `&region=${isValidId(filterName.region.id)}`,
      comments: `&text=${filterName.comments}`,
      commentsDateFrom: `&comments_date_from=${filterName.commentsDateFrom}`,
      commentsDateTo: `&comments_date_to=${filterName.commentsDateTo}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    dispatch(getUserList(5, 0, newFilter));

    handleFunctions.handleFilterByTaxpayerId({
      ...filterName,
      taxpayerId: e.target.value
    });
  };

  //

  const changeManagerHandleSearch = (e) => {
    const allFilters = {
      user: `&user=${isValidId(e.target.value.id)}`,
      name: `&name=${filterName.name}`,
      taxpayerId: `&taxpayer_id=${filterName.taxpayerId}`,
      status: `&status=${filterName.status}`,
      dateBefore: `&date_before=${filterName.dateBefore}`,
      dateAfter: `&date_after=${filterName.dateAfter}`,
      region: `&region=${isValidId(filterName.region.id)}`,
      comments: `&text=${filterName.comments}`,
      commentsDateFrom: `&comments_date_from=${filterName.commentsDateFrom}`,
      commentsDateTo: `&comments_date_to=${filterName.commentsDateTo}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    dispatch(getUserList(5, 0, newFilter));

    handleFunctions.handleFilterByManager({
      ...filterName,
      user: e.target.value
    });
  };

  const changeStatusHandleSearch = (index) => {
    if (index === -1) index = '';

    const allFilters = {
      user: `&user=${isValidId(filterName.user.id)}`,
      name: `&name=${filterName.name}`,
      taxpayerId: `&taxpayer_id=${filterName.taxpayerId}`,
      status: `&status=${index}`,
      dateBefore: `&date_before=${filterName.dateBefore}`,
      dateAfter: `&date_after=${filterName.dateAfter}`,
      region: `&region=${isValidId(filterName.region.id)}`,
      comments: `&text=${filterName.comments}`,
      commentsDateFrom: `&comments_date_from=${filterName.commentsDateFrom}`,
      commentsDateTo: `&comments_date_to=${filterName.commentsDateTo}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    dispatch(getUserList(5, 0, newFilter));

    handleFunctions.handleFilterByStatus({
      ...filterName,
      status: index
    });
  };

  const changeDateBeforeHandleSearch = (e) => {
    const allFilters = {
      user: `&user=${isValidId(filterName.user.id)}`,
      name: `&name=${filterName.name}`,
      taxpayerId: `&taxpayer_id=${filterName.taxpayerId}`,
      status: `&status=${filterName.status}`,
      dateBefore: `&date_before=${e.target.value}`,
      dateAfter: `&date_after=${filterName.dateAfter}`,
      region: `&region=${isValidId(filterName.region.id)}`,
      comments: `&text=${filterName.comments}`,
      commentsDateFrom: `&comments_date_from=${filterName.commentsDateFrom}`,
      commentsDateTo: `&comments_date_to=${filterName.commentsDateTo}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    dispatch(getUserList(5, 0, newFilter));
    handleFunctions.handleFilterByDateBefore({
      ...filterName,
      dateBefore: e.target.value
    });
  };

  const changeDateAfterHandleSearch = (e) => {
    const allFilters = {
      user: `&user=${isValidId(filterName.user.id)}`,
      name: `&name=${filterName.name}`,
      taxpayerId: `&taxpayer_id=${filterName.taxpayerId}`,
      status: `&status=${filterName.status}`,
      dateBefore: `&date_before=${filterName.dateBefore}`,
      dateAfter: `&date_after=${e.target.value}`,
      region: `&region=${isValidId(filterName.region.id)}`,
      comments: `&text=${filterName.comments}`,
      commentsDateFrom: `&comments_date_from=${filterName.commentsDateFrom}`,
      commentsDateTo: `&comments_date_to=${filterName.commentsDateTo}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    dispatch(getUserList(5, 0, newFilter));

    handleFunctions.handleFilterByDateAfter({
      ...filterName,
      dateAfter: e.target.value
    });
  };

  const changeRegionHandleSearch = (e) => {
    const allFilters = {
      user: `&user=${isValidId(filterName.user.id)}`,
      name: `&name=${filterName.name}`,
      taxpayerId: `&taxpayer_id=${filterName.taxpayerId}`,
      status: `&status=${filterName.status}`,
      dateBefore: `&date_before=${filterName.dateBefore}`,
      dateAfter: `&date_after=${filterName.dateAfter}`,
      region: `&region=${isValidId(e.target.value.id)}`,
      comments: `&text=${filterName.comments}`,
      commentsDateFrom: `&comments_date_from=${filterName.commentsDateFrom}`,
      commentsDateTo: `&comments_date_to=${filterName.commentsDateTo}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    dispatch(getUserList(5, 0, newFilter));

    handleFunctions.handleFilterByRegion({
      ...filterName,
      region: e.target.value
    });
  };

  const changeCommentaryHandleSearch = (e) => {
    const allFilters = {
      user: `&user=${isValidId(filterName.user.id)}`,
      name: `&name=${filterName.name}`,
      taxpayerId: `&taxpayer_id=${filterName.taxpayerId}`,
      status: `&status=${filterName.status}`,
      dateBefore: `&date_before=${filterName.dateBefore}`,
      dateAfter: `&date_after=${filterName.dateAfter}`,
      region: `&region=${isValidId(filterName.region.id)}`,
      comments: `&comments=${e.target.value}`,
      commentsDateFrom: `&comments_date_from=${filterName.commentsDateFrom}`,
      commentsDateTo: `&comments_date_to=${filterName.commentsDateTo}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    dispatch(getUserList(5, 0, newFilter));
    handleFunctions.handleFilterByCommentary({
      ...filterName,
      comments: e.target.value
    });
  };

  const changeDateAfterCommentaryHandleSearch = (e) => {
    const allFilters = {
      user: `&user=${isValidId(filterName.user.id)}`,
      name: `&name=${filterName.name}`,
      taxpayerId: `&taxpayer_id=${filterName.taxpayerId}`,
      status: `&status=${filterName.status}`,
      dateBefore: `&date_before=${filterName.dateBefore}`,
      dateAfter: `&date_after=${filterName.dateAfter}`,
      region: `&region=${isValidId(filterName.region.id)}`,
      comments: `&text=${filterName.comments}`,
      commentsDateFrom: `&comments_date_from=${e.target.value}`,
      commentsDateTo: `&comments_date_to=${filterName.commentsDateTo}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    console.log(allFilters);
    dispatch(getUserList(5, 0, newFilter));
    handleFunctions.handleFilterByCommentaryDateFrom({
      ...filterName,
      commentsDateFrom: e.target.value
    });
  };

  const changeDateBeforeCommentaryHandleSearch = (e) => {
    const allFilters = {
      user: `&user=${isValidId(filterName.user.id)}`,
      name: `&name=${filterName.name}`,
      taxpayerId: `&taxpayer_id=${filterName.taxpayerId}`,
      status: `&status=${filterName.status}`,
      dateBefore: `&date_before=${filterName.dateBefore}`,
      dateAfter: `&date_after=${filterName.dateAfter}`,
      region: `&region=${isValidId(filterName.region.id)}`,
      comments: `&text=${filterName.comments}`,
      commentsDateFrom: `&comments_date_from=${filterName.commentsDateFrom}`,
      commentsDateTo: `&comments_date_to=${e.target.value}`
    };

    const newFilter = Object.values(allFilters)
      .map((item) => item)
      .join('');

    dispatch(getUserList(5, 0, newFilter));
    handleFunctions.handleFilterByCommentaryDateTo({
      ...filterName,
      commentsDateTo: e.target.value
    });
  };

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Icon icon={roundFilterList} />} onClick={onOpenFilter}>
        Фильтры&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 560, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Фильтры
              </Typography>
              <MIconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </MIconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Название
                  </Typography>
                  <SearchStyle
                    value={filterName.name}
                    size="small"
                    onChange={changeNameHandleSearch}
                    placeholder="Поиск по имени"
                    startAdornment={
                      <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                  />
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    ИНН
                  </Typography>
                  <SearchStyle
                    value={filterName.taxpayerId}
                    size="small"
                    onChange={changeNumberHandleSearch}
                    placeholder="Поиск по ИНН"
                    startAdornment={
                      <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                  />
                </div>

                {/* <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Адрес
                  </Typography>
                  <SearchStyle
                    value={filterName.address}
                    size="small"
                    // onChange={changeAddressHandleSearch}
                    placeholder="Поиск по адресу"
                    startAdornment={
                      <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                  />
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Номер телефона
                  </Typography>
                  <SearchStyle
                    value={filterName.phoneNumber}
                    size="small"
                    // onChange={changeTelHandleSearch}
                    placeholder="Поиск по номеру телефона"
                    startAdornment={
                      <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                  />
                </div> */}

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Менеджер
                  </Typography>
                  <RadioGroup {...getFieldProps('rating')}>
                    <FormControl fullWidth>
                      <Select
                        labelId="user-select-label"
                        size="small"
                        id="user-select"
                        value={filterName.user}
                        onChange={changeManagerHandleSearch}
                      >
                        <MenuItem value={EMPTY}>Любой</MenuItem>
                        {managers.map((item) => (
                          <MenuItem key={item.id} value={item}>
                            {item.full_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Статус
                  </Typography>
                  <RadioGroup {...getFieldProps('category')}>
                    {FILTER_CATEGORY_OPTIONS.map((item, index) => (
                      <FormControlLabel
                        onClick={() => changeStatusHandleSearch(index - 1)}
                        key={item}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Текущая дата
                  </Typography>

                  <Stack direction="row" ml={-1} spacing={2}>
                    <Item>
                      <FormControl fullWidth>
                        <TextField
                          id="datetime-local"
                          type="datetime-local"
                          size="small"
                          defaultValue={filterName.dateAfter}
                          onChange={changeDateAfterHandleSearch}
                          placeholder="От"
                          sx={{ width: 240 }}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Item>
                    <Item>
                      <FormControl fullWidth>
                        <TextField
                          id="datetime-local"
                          type="datetime-local"
                          size="small"
                          defaultValue={filterName.dateBefore}
                          onChange={changeDateBeforeHandleSearch}
                          sx={{ width: 240 }}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Item>
                  </Stack>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Регион
                  </Typography>
                  <RadioGroup {...getFieldProps('rating')}>
                    <FormControl fullWidth>
                      <Select
                        labelId="region-select-label"
                        size="small"
                        id="region-select"
                        value={filterName.region}
                        onChange={changeRegionHandleSearch}
                      >
                        <MenuItem value={EMPTY}>Любой</MenuItem>
                        {regions.map((item) => (
                          <MenuItem key={item.id} value={item}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Текст комментария
                  </Typography>
                  <SearchStyle
                    value={filterName.comments}
                    size="small"
                    onChange={changeCommentaryHandleSearch}
                    placeholder="Search product..."
                    startAdornment={
                      <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                  />
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Дата комментария
                  </Typography>

                  <Stack direction="row" ml={-1} spacing={2}>
                    <Item>
                      <FormControl fullWidth>
                        <TextField
                          id="datetime-local"
                          type="datetime-local"
                          size="small"
                          defaultValue={filterName.commentsDateFrom}
                          onChange={changeDateAfterCommentaryHandleSearch}
                          sx={{ width: 240 }}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Item>
                    <Item>
                      <FormControl fullWidth>
                        <TextField
                          id="datetime-local"
                          type="datetime-local"
                          size="small"
                          defaultValue={filterName.commentsDateTo}
                          onChange={changeDateBeforeCommentaryHandleSearch}
                          sx={{ width: 240 }}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Item>
                  </Stack>
                </div>
              </Stack>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
