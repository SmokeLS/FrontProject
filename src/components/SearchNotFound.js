import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.object
};

export default function SearchNotFound({ searchQuery, ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Не найдено
      </Typography>
      <Typography variant="body2" align="center">
        Не было найдено результатов для &nbsp;
        <strong>&quot;{searchQuery.name}&quot;</strong>. Попробуйте изменить фильтры.
      </Typography>
    </Paper>
  );
}
