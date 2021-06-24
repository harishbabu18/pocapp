import React, { useState, useEffect } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../redux/index';
import { LinearProgress } from "@material-ui/core";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function UserManagement() {
 
  const dispatch = useDispatch();

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
 

const filter =()=>{
  const model = gridApi.getFilterModel(); 
  console.log("##Filter model##",model);
  let requestBody = {filterValues:[]}
  Object.keys(model).map(key=>{
    requestBody.filterValues.push({"key":key,"value":model[key].filter,"operation":model[key].type})
    console.log("##key value##",key)
    console.log("##Filter value##",model[key].filter)
  })
console.log("##request body##",requestBody)
dispatch(fetchUsers(requestBody))
}

const onGridReady = (params) => {
  setGridApi(params.api);
  setGridColumnApi(params.columnApi);
  let requestBody = {filterValues:[]}
  dispatch(fetchUsers(requestBody))
}

const countryFilterParams = {
  newRowsAction: 'keep'
};

  const userdata = useSelector((state) => state.user);

  return userdata.loading ? (
    <div>
      <LinearProgress />
    </div>
  ) : userdata.error ? (
    <h1>
      {userdata.error} {JSON.parse(localStorage.auth).data.access_token}
    </h1>
  ) : (
    <div className="ag-theme-material" style={{ height: 600, width: "100%" }}>
      <AgGridReact
      onFilterChanged={
        (value)=>{
          filter();
          console.log(value)
        }  
      }
      onGridReady={onGridReady}
      onSortChanged={()=>{
        console.log("##On Sort Changed ##")
      }}
      pagination={true}
        rowData={userdata.users}>
        <AgGridColumn field="firstName" sortable={true} filter={true} filterParams={countryFilterParams} ></AgGridColumn>
        <AgGridColumn field="lastName" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="email" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="mobile" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="address" sortable={true} filter={true}></AgGridColumn>
      </AgGridReact>
    </div>
  )
}
