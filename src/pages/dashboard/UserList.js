/* eslint-disable no-debugger */
import _, { filter } from 'lodash';
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
import { getUserList, deleteUser } from '../../redux/slices/user';
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
  { id: 'name', label: 'Название', alignRight: false },
  { id: 'InvidialNumber', label: 'ИНН', alignRight: false },
  { id: 'contactdate', label: 'Дата контакта', alignRight: false },
  { id: 'status', label: 'Статус', alignRight: false },
  { id: 'Commentary', label: 'Комментарий', alignRight: false }
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

function applySortFilter(array, comparator, query, property) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user[`${property}`].toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState({
    name: '',
    individualNumber: '',
    address: '',
    tel: '',
    manager: '',
    status: '',
    currentDate: '',
    region: '',
    commentary: '',
    commentaryDate: ''
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleFunctions = {
    handleFilterByName: (search) => {
      setFilterName({ ...search, name: search.name });
    },
    handleFilterByNumber: (search) => {
      setFilterName({ ...search, individualNumber: search.individualNumber });
    },
    handleFilterByAddress: (search) => {
      setFilterName({ ...search, address: search.address });
    },
    handleFilterByTel: (search) => {
      setFilterName({ ...search, tel: search.tel });
    },
    handleFilterByManager: (search) => {
      setFilterName({ ...search, manager: search.target.value });
    },
    handleFilterByStatus: (search) => {
      setFilterName({ ...search, status: search.status });
    },
    handleFilterByCurrentDate: (search) => {
      setFilterName({ ...search, currentDate: search.currentDate });
    },
    handleFilterByRegion: (search) => {
      setFilterName({ ...search, region: search.target.value });
    },
    handleFilterByCommentary: (search) => {
      setFilterName({ ...search, commentary: search.commentary });
    },
    handleFilterByCommentaryDate: (search) => {
      setFilterName({ ...search, commentaryDate: search.commentaryDate });
    }
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  let isUserNotFound = userList.length;

  const filteredNumbers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName.individualNumber,
    'individualNumber'
  );
  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName.name, 'name');
  const filteredAddresses = applySortFilter(userList, getComparator(order, orderBy), filterName.address, 'address');
  const filteredTels = applySortFilter(userList, getComparator(order, orderBy), filterName.tel, 'tel');
  // const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName.name, 'name');
  // const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName.name, 'name');
  // const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName.name, 'name');
  // const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName.name, 'name');
  const filteredCommentaries = applySortFilter(userList, getComparator(order, orderBy), filterName.name, 'name');
  // const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName.name, 'name');

  const concatedUsers = _.intersection(
    filteredUsers,
    filteredNumbers,
    filteredAddresses,
    filteredTels,
    filteredCommentaries
  );

  if (concatedUsers.length) isUserNotFound = false;

  return (
    <Page title="User: List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Все компании"
          links={[
            { name: 'Компании', href: PATH_DASHBOARD.root },
            { name: 'Все компании', href: PATH_DASHBOARD.user.root }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.newUser}
              startIcon={<Icon icon={plusFill} />}
            >
              Новая карточка
            </Button>
          }
        />

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} handleFunctions={handleFunctions} />
          <Scrollbar>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {concatedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, individualNumber } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        sx={{ verticalAlign: 'top' }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate(`/dashboard/user/list/${id}`);
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{individualNumber}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              (status === 'В архиве' && 'error') ||
                              (status === 'В работе' && 'info') ||
                              (status === 'Новый' && 'success')
                            }
                          >
                            {status}
                          </Label>
                        </TableCell>
                        <TableCell ml={4} sx={{ width: '40%', minWidth: '240px' }}>
                          <Box
                            sx={{
                              maxHeight: '200px',
                              overflowY: 'scroll',
                              outline: '1px solid #ccc',
                              borderRadius: '10px'
                            }}
                          >
                            <Typography variant="caption" display="block" gutterBottom>
                              11.03.2021 15:30, Иванов И.И.
                            </Typography>
                            <Typography mb={2} sx={{ fontSize: '14px' }}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                              11.03.2021 16:30, Иванов И.И.
                            </Typography>
                            <Typography mb={2} sx={{ fontSize: '14px' }}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                              11.03.2021 16:30, Иванов И.И.
                            </Typography>
                            <Typography mb={2} sx={{ fontSize: '14px' }}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                            </Typography>
                          </Box>
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
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={userList.length}
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
