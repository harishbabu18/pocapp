import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data, Filters } from "react-data-grid-addons";
//import { makeStyles } from '@material-ui/core/styles';
const defaultColumnProperties = {
  filterable: true,
  width: 160
};
// const useStyles = makeStyles(theme => ({
//   root: {
//     "& div.react-grid-Container": {
//       color: "gray",
//       fontfamily: "Roboto"
//     },
    
//     "& div.react-grid-HeaderCell":{
//       backgroundColor: "#000",
//       // textAlign: 'center',
//       color: "white",
//       borderWidth: 2, borderColor: 'white',borderStyle: 'solid'
//     },
//     "& div.react-grid-Row":{
//       "&:hover":{
//           color: "red",

//       }   
//     },



//     "& div.react-grid-Cell":{
//       backgroundColor: "#333",
//       // textAlign: 'center',
//       color: "white",
//       borderWidth: 2, borderColor: 'white',borderStyle: 'solid',
//     }
//   }
// }));

const selectors = Data.Selectors;
const {
  NumericFilter,
  AutoCompleteFilter,
  MultiSelectFilter,
  SingleSelectFilter
} = Filters;
const columns = [
  {
    key: "id",
    name: "ID",
    filterRenderer: NumericFilter
  },
  {
    key: "firstName",
    name: "First Name",
    filterRenderer: AutoCompleteFilter
  },
  {
    key: "lastName",
    name: "Last Name",
    filterRenderer: AutoCompleteFilter
  },
  {
    key: "jobTitle",
    name: "Job Title",
    filterRenderer: MultiSelectFilter
  },
  {
    key: "jobArea",
    name: "Job Area",
    filterRenderer: SingleSelectFilter
  },
  {
    key: "jobType",
    name: "Job Type"
  },
  {
    key: "email",
    name: "Email"
  },
  {
    key: "street",
    name: "Street"
  },
  {
    key: "zipCode",
    name: "ZipCode"
  },
  {
    key: "date",
    name: "Date"
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase"
  }
].map(c => ({ ...c, ...defaultColumnProperties }));

const ROW_COUNT = 50;

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getValidFilterValues(rows, columnId) {
  return rows
    .map(r => r[columnId])
    .filter((item, i, a) => {
      return i === a.indexOf(item);
    });
}

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

export default function Example({ rows }) {
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => filteredRows[i]}
      rowsCount={filteredRows.length}
      minHeight={500}
      toolbar={<Toolbar enableFilter={true} />}
      onAddFilter={filter => setFilters(handleFilterChange(filter))}
      onClearFilters={() => setFilters({})}
      getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
    />
  );
}
