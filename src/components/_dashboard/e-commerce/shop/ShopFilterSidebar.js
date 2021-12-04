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
  OutlinedInput
} from '@mui/material';
//
import { useTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { filter, includes, orderBy } from 'lodash-es';
import useSettings from '../../../../hooks/useSettings';
import { MIconButton } from '../../../@material-extend';
import Scrollbar from '../../../Scrollbar';
import ColorManyPicker from '../../../ColorManyPicker';
import { filterProducts, getProducts } from '../../../../redux/slices/product';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' }
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['Все', 'В архиве', 'В работе', 'Новый'];
export const FILTER_MANAGERS_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
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

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

function applyFilter(products, sortBy, filters) {
  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }
  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.gender.length > 0) {
    products = filter(products, (_product) => includes(filters.gender, _product.gender));
  }
  if (filters.category !== 'All') {
    products = filter(products, (_product) => _product.category === filters.category);
  }
  if (filters.colors.length > 0) {
    products = filter(products, (_product) => _product.colors.some((color) => filters.colors.includes(color)));
  }
  if (filters.priceRange) {
    products = filter(products, (_product) => {
      if (filters.priceRange === 'below') {
        return _product.price < 25;
      }
      if (filters.priceRange === 'between') {
        return _product.price >= 25 && _product.price <= 75;
      }
      return _product.price > 75;
    });
  }
  if (filters.rating) {
    products = filter(products, (_product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return _product.totalRating > convertRating(filters.rating);
    });
  }
  return products;
}

export default function ShopFilterSidebar(props) {
  const { isOpenFilter, onResetFilter, onOpenFilter, onCloseFilter, formik, filterName, onFilterName } = props;
  const { values, getFieldProps, handleChange, resetForm, handleSubmit, isSubmitting, initialValues } = formik;

  const [age, setAge] = React.useState('');

  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const { products, sortBy, filters } = useSelector((state) => state.product);
  const filteredProducts = applyFilter(products, sortBy, filters);

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const changeHandleSearch = (e) => {
    onFilterName({
      ...filterName,
      name: e.target.value
    });
  };

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Icon icon={roundFilterList} />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filters
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
                    onChange={changeHandleSearch}
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
                    ИНН
                  </Typography>
                  <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
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
                    Адрес
                  </Typography>
                  <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
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
                    Номер телефона
                  </Typography>
                  <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
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
                    Менеджер
                  </Typography>
                  <RadioGroup {...getFieldProps('rating')}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChangeSelect}
                      >
                        {FILTER_MANAGERS_OPTIONS.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
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
                    {FILTER_CATEGORY_OPTIONS.map((item) => (
                      <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Номер телефона
                  </Typography>
                  <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
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
                    Текущая дата
                  </Typography>
                  <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="От"
                    startAdornment={
                      <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                  />
                  <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="До"
                    startAdornment={
                      <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                  />
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Регион
                  </Typography>
                  <RadioGroup {...getFieldProps('rating')}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChangeSelect}
                      >
                        {FILTER_MANAGERS_OPTIONS.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
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
                    value={filterName}
                    onChange={onFilterName}
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
                  <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="От"
                    startAdornment={
                      <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                  />
                  <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="До"
                    startAdornment={
                      <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                  />
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
