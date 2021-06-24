import React ,{useState,useEffect}from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './redux/index';
import DataGrid from './component/DataGrid';

const COLUMN_WIDTH = 350;
const defaultColumnProperties = {
  filterable: true,
  resizable: true,
  sortable: true
};


const columns = [
    { key: "firstName", name: "First Name" ,   width: COLUMN_WIDTH},
    { key: "lastName", name: "Last Name",   width: COLUMN_WIDTH},
    { key: "email", name: "E-Mail",width: COLUMN_WIDTH},
    { key: "mobile", name: "Mobile",   width: COLUMN_WIDTH},
    { key: "address", name: "Address",   width: COLUMN_WIDTH},
  ].map(c => ({ ...c, ...defaultColumnProperties }));


 

export default function App() {
  const rows = useSelector((state) => state.user);
  var user = rows.users
  const dispatch = useDispatch();
  const [data,setData] = useState(rows.users)
  const [filters,setFilters] = useState([])
  const [sortColumn,setSortColumn]= useState("");
  const [sortDirection,setSortDirection]= useState("");

  const onGridSort = (sortColumn, sortDirection)=>{
    //setData(rows.users);
    setSortColumn(sortDirection!="NONE"?sortColumn:"")
    setSortDirection(sortDirection!="NONE"?sortDirection.toLowerCase():"")
   // loadData(sortColumn,sortDirection)
 }

  const loadData = (sortColumn, sortDirection) =>{
    let requestBody = {filterValues:filters,sortColumn:sortColumn, sortDirection:sortDirection}
    console.log(requestBody)
    dispatch(fetchUsers(requestBody))
    dataVal()
  }
const dataVal = () =>{
  setData(rows.users);
}


  useEffect(() => {
    loadData(sortColumn,sortDirection)
    dataVal();
  },[filters,sortColumn,sortDirection])

  return (<DataGrid data={user} columns={columns} filters={filters} setFilters={setFilters} onGridSort={onGridSort}/>)
  // return <div>
    
  //   <h1>{JSON.stringify(user)}</h1>
  
  
  // </div>
}
