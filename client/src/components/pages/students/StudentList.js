import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
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
} from '@material-ui/core';
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
    width: '25%',
  },
  {
    id: 'grade',
    numeric: true,
    disablePadding: false,
    label: 'Grade',
    width: '5%',
  },
  {
    id: 'phone_number1',
    numeric: true,
    disablePadding: false,
    label: 'Phone Number',
    width: '15%',
  },
  {
    id: 'edit',
    numeric: true,
    disablePadding: false,
    label: 'Edit',
    width: '10%',
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleNewStudent = () => {
    console.log('new students');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);

  return (
    <Grid item xs={12}>
      <Paper>
        <Box p={2}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={7}>
              <Typography variant="h4" id="tableTitle" component="div">
                Students
              </Typography>
            </Grid>
            <Grid item xs={5} style={{ textAlign: 'right' }}>
              <Button onClick={() => handleNewStudent()}>New Student</Button>
            </Grid>
          </Grid>
        </Box>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="Students"
            aria-label="student table"
          >
            <TableHead>
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
                  return <StudentListItem student={student} key={student.id} />;
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
  );
};

export default StudentList;
