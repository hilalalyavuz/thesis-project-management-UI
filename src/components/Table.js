import * as React from 'react';
import {useState, useRef} from 'react'
import { DataGrid, GridSelectedRowCount, selectedGridRowsCountSelector, selectedGridRowsSelector } from '@mui/x-data-grid';
import Sidebar from '../components/Sidebar';
import '../css/Common.css'
import '../css/Documents.css'
import '../css/Table.css'
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card } from '@mui/material';



const Table = (props) => {
    
    
    const [deneme, setDeneme] = useState();
    

    const toast = useRef(null);

    //for rad
    const [selectedProduct1, setSelectedProduct1] = useState(null);
    const [selectedProduct2, setSelectedProduct2] = useState(null);

    const onRowSelect = (event) => {
      setSelectedProduct1(event)
      if(event.length>selectedProduct2){
        toast.current.show({ severity: 'info', summary: 'RAD Selected', detail: `id: ${event}`, life: 3000 });
      }else{
        toast.current.show({ severity: 'warn', summary: 'RAD Unselected', life: 3000 });
      }
      setSelectedProduct2(event.length)
  }

  const deleteRow = () =>{
    console.log(selectedProduct1)
  }

    const Input = styled('input')({
      display: 'none',
    });

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
    const columns = [

        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        }
      ];


    return(
        <>
        
        <Toast ref={toast} />

        <Card className="card2">
        <div>
              <div className='table'>
                              <h3>{props.data}</h3>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              onSelectionModelChange = {onRowSelect}
                                              
                                          />
                          </div>

                          <div className='tableButtons'>

                            <Button variant="outlined" onClick={deleteRow} startIcon={<DeleteIcon />}>
                              Delete
                            </Button>

                            <label htmlFor="contained-button-file">
                              <Input accept="image/*" id="contained-button-file" multiple type="file" />
                              <Button startIcon={<FileUploadIcon />} variant="contained" component="span">
                                Upload
                              </Button>
                            </label>

                            <Button variant="contained" startIcon={<VisibilityIcon />}>
                              View
                            </Button>

                          </div>
            </div>
        </Card>
        
        
        </>
    )

}
export default Table;