import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TextField,
  Box,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Link,
  TextareaAutosize
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getEmployeeList, deleteUser } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'name', label: 'ФИО', alignRight: false },
  { id: 'email', label: 'Почта', alignRight: false },
  { id: 'telephone', label: 'Телефон', alignRight: false },
  { id: 'status', label: 'Статус', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function EmployeeList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeeList } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [query, setQuery] = useState('');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getEmployeeList(rowsPerPage, page, query));
  }, [dispatch, rowsPerPage, page, query]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const changeNameHandleSearch = (e) => {
    setQuery(e.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0;

  const filteredUsers = applySortFilter(employeeList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User: List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Все сотрудники"
          links={[
            { name: 'Сотрудники', href: PATH_DASHBOARD.root },
            { name: 'Все сотрудники', href: PATH_DASHBOARD.employees.list }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.employees.newEmployee}
              startIcon={<Icon icon={plusFill} />}
            >
              Новая карточка
            </Button>
          }
        />

        <Card>
          <UserListToolbar query={query} changeNameHandleSearch={changeNameHandleSearch} />

          <Scrollbar>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={employeeList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, username, full_name, contact_email, contact_phone, is_banned } = row;
                    const isItemSelected = selected.indexOf(full_name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} sx={{ verticalAlign: 'top' }}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate(`/dashboard/employees/all/${id}`);
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{full_name}</TableCell>
                        <TableCell align="left">{contact_email}</TableCell>
                        <TableCell align="left">{contact_phone}</TableCell>
                        <TableCell ml={4}>
                          {is_banned ? (
                            <Label variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'} color="error">
                              Заблокирован
                            </Label>
                          ) : (
                            <Label variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'} color="success">
                              Активный
                            </Label>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
            component="div"
            count={employeeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
