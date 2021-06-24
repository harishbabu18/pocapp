import React from 'react'
import ReactDataGrid from "react-data-grid";
import { Toolbar} from "react-data-grid-addons";
import { makeStyles } from '@material-ui/core/styles';

const {
    DraggableHeader: { DraggableContainer }
  } = require("react-data-grid-addons");

  const useStyles = makeStyles(theme => ({
    root: {
      "& div.react-grid-Container": {
        fontfamily: "Roboto"
      },
      "& div.react-grid-Canvas" :{
        backgroundColor: "#000",
      },
      "& div.react-grid-HeaderRow": {
        backgroundColor: "#000",
        color:"white"
      },
      "& div.react-grid-HeaderCell":{
        backgroundColor: "#000",
        // textAlign: 'center',
        //color: "white",
        borderWidth: 2, borderColor: 'white',borderStyle: 'solid'
      },
      "& div.react-grid-Row":{  
        color: "white",
        "&:hover":{
          color: "black",
        }
       },
      "& div.react-grid-Cell":{
        backgroundColor: "#333",
        borderWidth: 2, borderColor: 'white',borderStyle: 'solid',
      }
    }
  }));
  

export default function DataGrid(props) {
    const classes = useStyles();
const {columns,data,filters,setFilters,onGridSort} = props
const onHeaderDrop = (source, target) => {

    const columnSourceIndex = this.state.columns.findIndex(
        i => i.key === source
      );

      const columnTargetIndex = this.state.columns.findIndex(
        i => i.key === target
      );
    
}

  return (<div className={classes.root}>
        <DraggableContainer onHeaderDrop={onHeaderDrop}>
      <ReactDataGrid
    columns={columns}
    rowGetter={i => data[i]}
 
    onColumnResize={(idx, width) =>{
      console.log(`Column ${idx} has been resized to ${width}`)
    }
    }
 
    onGridSort={onGridSort}
    toolbar={<Toolbar enableFilter={true} />}

  onAddFilter={filter => {
    let filterValues = filters
    let keyindex = filterValues.findIndex(x => x.key === filter.column.key)
    if(keyindex!==-1) {
      filterValues.splice(keyindex,1,{operation:"contains",value:filter.filterTerm,key:filter.column.key})
    } else {
      filterValues.push({operation:"contains",value:filter.filterTerm,key:filter.column.key})
    }
    filterValues = filterValues.filter(x => x.value !=="")
    setFilters(filterValues)
  }}
  onClearFilters={() => setFilters([])}
    rowsCount={10}
    minHeight={450} 
    
    />
    </DraggableContainer></div>)
}
