import { useState, useEffect, useRef } from 'react';
/* eslint-disable no-debugger */
import _, { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
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
  TextareaAutosize,
  Divider
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList, startLoading } from '../../redux/slices/user';
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
import ScrollableCell from './ScrollableCell';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Название', alignRight: false },
  { id: 'user', label: 'Менеджер', alignRight: false },
  { id: 'InvidialNumber', label: 'ИНН', alignRight: false },
  { id: 'contactdate', label: 'Дата контакта', alignRight: false },
  { id: 'status', label: 'Статус', alignRight: false },
  { id: 'Commentary', label: 'Комментарии', alignRight: false }
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

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userList, count, filters, isLoading } = useSelector((state) => state.user);
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState({
    user: '',
    name: '',
    taxpayerId: '',
    status: '',
    dateBefore: '',
    dateAfter: '',
    region: '',
    comments: '',
    commentsDateFrom: '',
    commentsDateTo: ''
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newFilters, setNewFilters] = useState({
    user: '&user=',
    name: '&name=',
    taxpayerId: '&taxpayer_id=',
    status: '&status=',
    dateBefore: '&date_before=',
    dateAfter: '&date_after=',
    region: '&region=',
    comments: '&comments=',
    commentsDateFrom: '&comments_date_from=',
    commentsDateTo: '&comments_date_to='
  });

  useEffect(() => {
    async function getUsers() {
      await dispatch(getUserList(rowsPerPage, page, filters));
      setLoaded(true);
    }
    getUsers();
  }, [dispatch, rowsPerPage, page, filters]);

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
    handleFilterByTaxpayerId: (search) => {
      setFilterName({ ...search, taxpayerId: search.taxpayerId });
    },
    handleFilterByAddress: (search) => {
      setFilterName({ ...search, address: search.address });
    },
    handleFilterByTel: (search) => {
      setFilterName({ ...search, phoneNumber: search.phoneNumber });
    },
    handleFilterByStatus: (search) => {
      setFilterName({ ...search, status: search.status });
    },
    handleFilterByManager: (search) => {
      setFilterName({ ...search, user: search.user });
    },
    handleFilterByDateBefore: (search) => {
      setFilterName({ ...search, dateBefore: search.dateBefore });
    },
    handleFilterByDateAfter: (search) => {
      setFilterName({ ...search, dateAfter: search.dateAfter });
    },
    handleFilterByRegion: (search) => {
      setFilterName({ ...search, region: search.region });
    },
    handleFilterByCommentary: (search) => {
      setFilterName({ ...search, comments: search.comments });
    },
    handleFilterByCommentaryDateFrom: (search) => {
      setFilterName({ ...search, commentaryDateFrom: search.commentsDateFrom });
    },
    handleFilterByCommentaryDateTo: (search) => {
      setFilterName({ ...search, commentaryDateTo: search.commentsDateTo });
    },
    handleResetFilter: () => {
      setFilterName({
        user: '',
        name: '',
        taxpayerId: '',
        status: '',
        dateBefore: '',
        dateAfter: '',
        region: '',
        comments: '',
        commentsDateFrom: '',
        commentsDateTo: ''
      });
    }
  };

  const emptyRows = page > count / rowsPerPage ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  let isUserNotFound = userList.length;

  if (userList.length) {
    isUserNotFound = false;
  } else {
    isUserNotFound = true;
  }

  if (!loaded) {
    return null;
  }

  return (
    <Page title="User: List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {user.sd_can_create_companies ? (
          <HeaderBreadcrumbs
            heading="Все компании"
            links={[
              { name: 'Отдел продаж', href: PATH_DASHBOARD.root },
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
                Добавить компанию
              </Button>
            }
          />
        ) : (
          <HeaderBreadcrumbs
            heading="Все компании"
            links={[
              { name: 'Компании', href: PATH_DASHBOARD.root },
              { name: 'Все компании', href: PATH_DASHBOARD.user.root }
            ]}
          />
        )}
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            newFilters={newFilters}
            filterName={filterName}
            rowsPerPage={rowsPerPage}
            page={page}
            handleFunctions={handleFunctions}
            setPage={setPage}
          />
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={userList.length} numSelected={selected.length} />
                <TableBody>
                  {userList.map((row, index) => {
                    const { id, user, name, date, status, taxpayer_id, comments } = row;
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
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography
                              variant="subtitle2"
                              sx={{ cursor: 'pointer' }}
                              noWrap
                              onClick={() => {
                                navigate(`${PATH_DASHBOARD.user.list}/${id}`);
                              }}
                            >
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{user}</TableCell>
                        <TableCell align="left">{taxpayer_id}</TableCell>
                        <TableCell align="left">{date}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(status === 0 && 'error') || (status === 1 && 'info') || (status === 2 && 'success')}
                          >
                            {status === 0 && 'В архиве'}
                            {status === 1 && 'Новый'}
                            {status === 2 && 'В работе'}
                          </Label>
                        </TableCell>
                        <ScrollableCell comments={comments} />
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody />
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
            component="div"
            count={count}
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
