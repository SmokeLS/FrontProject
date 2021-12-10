import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import { filter, includes, orderBy } from 'lodash';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Stack,
  RadioGroup,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
// ----------------------------------------------------------------------

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useLocation } from 'react-router';
import { getProducts, filterProducts } from '../../../../redux/slices/product';
import useSettings from '../../../../hooks/useSettings';
import fakeRequest from '../../../../utils/fakeRequest';
import { ShopTagFiltered, ShopProductSort, ShopProductList, ShopFilterSidebar } from '../../e-commerce/shop';
import { FILTER_MANAGERS_OPTIONS } from '../../e-commerce/shop/ShopFilterSidebar';

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.object,
  handleFunctions: PropTypes.object
};

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
        if (value === 'Manager4') return 4;
        if (value === 'Manager3') return 3;
        if (value === 'Manager2') return 2;
        return 1;
      };
      return _product.totalRating > convertRating(filters.rating);
    });
  }
  return products;
}

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

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

// ----------------------------------------------------------------------

export default function UserListToolbar({ numSelected, filterName, handleFunctions, newFilters }) {
  const location = useLocation();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const { products, sortBy, filters } = useSelector((state) => state.product);
  const filteredProducts = applyFilter(products, sortBy, filters);
  const [selectValue, setSelectValue] = useState('');

  const formik = useFormik({
    initialValues: {
      gender: filters.gender,
      category: filters.category,
      colors: filters.colors,
      priceRange: filters.priceRange,
      rating: filters.rating
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await fakeRequest(500);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, resetForm, handleSubmit, getFieldProps, isSubmitting, initialValues } = formik;

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

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark'
        })
      }}
    >
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      ) : (
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifySelf="flex-end"
          sx={{ mb: 5, width: '100%' }}
        >
          <ShopTagFiltered
            filters={filters}
            formik={formik}
            isShowReset={openFilter}
            onResetFilter={handleResetFilter}
            isDefault={isDefault}
          />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ mt: 5 }}>
            {location.pathname === '/dashboard/user/list' ? (
              <>
                <ShopFilterSidebar
                  formik={formik}
                  isOpenFilter={openFilter}
                  filterName={filterName}
                  handleFunctions={handleFunctions}
                  newFilters={newFilters}
                  onResetFilter={handleResetFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                />
                <ShopProductSort />
              </>
            ) : (
              <Box mt={1}>
                <RadioGroup sx={{ minWidth: 160 }} {...getFieldProps('rating')}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectValue}
                      onChange={handleChange}
                    >
                      {FILTER_MANAGERS_OPTIONS.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </RadioGroup>
              </Box>
            )}
          </Stack>
        </Stack>
      )}
    </RootStyle>
  );
}
