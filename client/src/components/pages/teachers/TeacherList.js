import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TeacherItem from './TeacherItem';
import {
  clearFilter,
  fetchTeacherList,
} from '../../../features/teacher/teacherSlice';
import TeacherFilter from './TeacherFilter';
import { TableSortLabel } from '@material-ui/core';

const headCells = [
  {
    id: 'first_name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    width: '25%',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    label: 'Username',
    width: '25%',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
    width: '35%',
  },
  {
    id: 'phone_number',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
    width: '15%',
  },
];

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = ({ classes, order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (e) => {
    onRequestSort(e, property);
  };

  return (
    <TableHead style={{ backgroundColor: 'blue' }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={
              headCell.numeric
                ? 'center'
                : headCell.id !== 'phone_number'
                ? 'left'
                : 'right'
            }
            style={{ width: headCell.width }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

const TeacherList = () => {
  const dispatch = useDispatch();
  const { teacherList, isLoading, filtered } = useSelector(
    (state) => state.teacher
  );
  const classes = useStyles();
  const pathName = useLocation().pathname;
  const currentWindowHeight = window.innerHeight - 254;
  const [paperHeight, setPaperHeight] = useState(currentWindowHeight);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('first_name');

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleResize = () => {
    setPaperHeight(window.innerHeight - 254);
  };

  useEffect(() => {
    if (teacherList.length === 0) {
      dispatch(fetchTeacherList());
    }
    dispatch(clearFilter());
  }, [dispatch, teacherList]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [paperHeight]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, teacherList.length - page * rowsPerPage);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <Box p={2}>
            <Grid container alignItems="center">
              <Box>
                <Typography variant="h4" id="tableTitle" component="div">
                  Teachers
                </Typography>
              </Box>
              <TeacherFilter />
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={pathName + '/new'}
              >
                New Teacher
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {teacherList.lenth !== 0 && isLoading === 'idle' && (
          <Paper>
            <TableContainer style={{ height: paperHeight }}>
              <Table
                stickyHeader
                className={classes.table}
                aria-labelledby="Teachers"
                aria-label="Teacher table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filtered !== null
                    ? stableSort(filtered, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((teacher) => (
                          <TeacherItem teacher={teacher} key={teacher.id} />
                        ))
                    : stableSort(teacherList, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((teacher) => (
                          <TeacherItem teacher={teacher} key={teacher.id} />
                        ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filtered ? filtered.length : teacherList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default TeacherList;
