import React ,{useState,useEffect}from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './../redux/index';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }



export default function ReactData() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.user);
  const loadData = () =>{
    let requestBody = {filterValues:[],sortColumn:'', sortDirection:''}
    console.log(requestBody)
    dispatch(fetchUsers(requestBody))
  }

  useEffect(() => {
    loadData()
  },[])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>E-Mail</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><TextField required id="standard-required" label="First Name"  fullWidth /></TableCell>
            <TableCell><TextField required id="standard-required" label="First Name"  fullWidth /></TableCell>
            <TableCell><TextField required id="standard-required" label="First Name"  fullWidth /></TableCell>
            <TableCell><TextField required id="standard-required" label="First Name"  fullWidth /></TableCell>
            <TableCell><TextField required id="standard-required" label="First Name"  fullWidth /></TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.users.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.mobile}</TableCell>
              <TableCell>{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}