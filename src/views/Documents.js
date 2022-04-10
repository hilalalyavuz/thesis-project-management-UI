import * as React from 'react';
import {useState, useRef} from 'react'
import { DataGrid, GridSelectedRowCount, selectedGridRowsCountSelector, selectedGridRowsSelector } from '@mui/x-data-grid';
import Sidebar from '../components/Sidebar';
import '../css/Common.css'
import '../css/Documents.css'
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';


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
  },
];

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



export default function Documents() {
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
    //for sdd
    const [selectedProduct3, setSelectedProduct3] = useState(null);
    const [selectedProduct4, setSelectedProduct4] = useState(null);

    const onRowSelect2 = (event) => {
      console.log(event)
      setSelectedProduct3(event)
      if(event.length>selectedProduct4){
        toast.current.show({ severity: 'info', summary: 'SDD Selected', detail: `id: ${event}`, life: 3000 });
      }else{
        toast.current.show({ severity: 'warn', summary: 'SDD Unselected', life: 3000 });
      }
      setSelectedProduct4(event.length)
  }

  const deleteRow2 = () =>{
    console.log(selectedProduct1)
  }
    //for document and code
    const [selectedProduct5, setSelectedProduct5] = useState(null);
    const [selectedProduct6, setSelectedProduct6] = useState(null);

    const onRowSelect3 = (event) => {
      console.log(event)
      setSelectedProduct5(event)
      if(event.length>selectedProduct6){
        toast.current.show({ severity: 'info', summary: 'THESIS DOCUMENT AND CODE Selected', detail: `id: ${event}`, life: 3000 });
      }else{
        toast.current.show({ severity: 'warn', summary: 'THESIS DOCUMENT AND CODE Unselected', life: 3000 });
      }
      setSelectedProduct6(event.length)
  }

  const deleteRow3 = () =>{
    console.log(selectedProduct1)
  }
    //for poster
    const [selectedProduct7, setSelectedProduct7] = useState(null);
    const [selectedProduct8, setSelectedProduct8] = useState(null);

    const onRowSelect4 = (event) => {
      console.log(event)
      setSelectedProduct7(event)
      if(event.length>selectedProduct8){
        toast.current.show({ severity: 'info', summary: 'POSTER Selected', detail: `id: ${event}`, life: 3000 });
      }else{
        toast.current.show({ severity: 'warn', summary: 'POSTER Unselected', life: 3000 });
      }
      setSelectedProduct8(event.length)
  }

  const deleteRow4 = () =>{
    console.log(selectedProduct1)
  }
    //for presentation
    const [selectedProduct9, setSelectedProduct9] = useState(null);
    const [selectedProduct10, setSelectedProduct10] = useState(null);

    const onRowSelect5 = (event) => {
      console.log(event)
      setSelectedProduct9(event)
      if(event.length>selectedProduct10){
        toast.current.show({ severity: 'info', summary: 'PRESENTATION Selected', detail: `id: ${event}`, life: 3000 });
      }else{
        toast.current.show({ severity: 'warn', summary: 'PRESENTATION Unselected', life: 3000 });
      }
      setSelectedProduct10(event.length)
  }

  const deleteRow5 = () =>{
    console.log(selectedProduct1)
  }

    

    const Input = styled('input')({
      display: 'none',
    });

  return (
    <div className='Page'>

        <div className='Sidebar'>
            <Sidebar/>
        </div>
        <Toast ref={toast} />
        <div className='Main' style={{alignItems:'center', flexDirection:'column'}}>

            <div>
              <div className='table'>
                              <h3>RAD</h3>
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

            <div>
              <div className='table'>
                              <h3>SDD</h3>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              onSelectionModelChange = {onRowSelect2}
                                              
                                          />
                          </div>

                          <div className='tableButtons'>

                            <Button variant="outlined" onClick={deleteRow2} startIcon={<DeleteIcon />}>
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

            <div>
              <div className='table'>
                              <h3>THESIS DOCUMENT AND CODE</h3>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              onSelectionModelChange = {onRowSelect3}
                                              
                                          />
                          </div>

                          <div className='tableButtons'>

                            <Button variant="outlined" onClick={deleteRow3} startIcon={<DeleteIcon />}>
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

            <div>
              <div className='table'>
                              <h3>POSTER</h3>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              onSelectionModelChange = {onRowSelect4}
                                              
                                          />
                          </div>

                          <div className='tableButtons'>

                            <Button variant="outlined" onClick={deleteRow4} startIcon={<DeleteIcon />}>
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

            <div>
              <div className='table'>
                              <h3>PRESENTATION</h3>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              onSelectionModelChange = {onRowSelect5}
                                              
                                          />
                          </div>

                          <div className='tableButtons'>

                            <Button variant="outlined" onClick={deleteRow5} startIcon={<DeleteIcon />}>
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

        </div>

    </div>
    
  );
}