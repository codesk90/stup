import React, { Fragment, useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import StudentListItem from './StudentListItem';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    width: '20%',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
    width: '25%',
  },
  {
    id: 'school',
    numeric: false,
    disablePadding: false,
    label: 'School Name',
    width: '20%',
  },
  {
    id: 'grade',
    numeric: true,
    disablePadding: false,
    label: 'Grade',
    width: '10%',
  },
  {
    id: 'level',
    numeric: true,
    disablePadding: false,
    label: 'Level',
    width: '10%',
  },
  {
    id: 'phone_number1',
    numeric: true,
    disablePadding: false,
    label: 'Phone Number',
    width: '15%',
  },
];

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
}));

const StudentList = () => {
  const { students } = useSelector((state) => state.student);
  const classes = useStyles();
  const pathName = useLocation().pathname;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const currentWindowHeight = window.innerHeight - 254;
  const [paperHeight, setPaperHeight] = useState(currentWindowHeight);

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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [paperHeight]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);

  return (
    <Fragment>
      <Grid item xs={12}>
        <Paper>
          <Box p={2}>
            <Grid container>
              <Box flexGrow={1}>
                <Typography variant="h4" id="tableTitle" component="div">
                  Students
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={pathName + '/new'}
              >
                New Student
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TableContainer style={{ height: paperHeight }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-labelledby="Students"
              aria-label="student table"
            >
              <TableHead style={{ backgroundColor: 'blue' }}>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      style={{ width: headCell.width }}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => {
                    return (
                      <StudentListItem student={student} key={student.id} />
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 77 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default StudentList;
