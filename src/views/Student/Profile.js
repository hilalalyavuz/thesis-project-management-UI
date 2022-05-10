import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Sidebar';
import '../../css/Common.css'
import '../../css/Profile.css'
import '../../css/Table.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Profile() {

    const [selectionModel, setSelectionModel] = useState([]);
    const [selectionModel1, setSelectionModel1] = useState([]);

    const onRowSelect = (selModel)=>{
            
            if (selModel.length > 1) {
              const selectionSet = new Set(selectionModel);
              const result = selModel.filter((s) => !selectionSet.has(s));

              setSelectionModel(result);
            } else {
              setSelectionModel(selModel);
            }
            
          
    }

    const onRowSelect1 = (selModel)=>{
            
        if (selModel.length > 1) {
          const selectionSet = new Set(selectionModel1);
          const result = selModel.filter((s) => !selectionSet.has(s));

          setSelectionModel1(result);
        } else {
          setSelectionModel1(selModel);
        }
        
      
}

    const deleteRow = () =>{
      
      }

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

<div className='Page'>

<div className='Sidebar'>
    <Sidebar dname='Profile'/>
</div>

<div className='Main'>
  <div className='Main2'>
    
        <div style={{width:'70%'}}>
        <Card className="card2">
        <h3>Profile</h3>
            <form>
                <div className='formTop'>
                    <div className='formLeft'>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                            id="outlined-read-only-input"
                            label="Name"
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField
                            id="outlined-read-only-input"
                            label="Surname"
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            />
                        </Box>
                    </div>
                    <div className='formRight'>
                    <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                            id="outlined-read-only-input"
                            label="Email"
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField
                            id="outlined-read-only-input"
                            label="School Id"
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        </Box>
                    </div>
                </div>
                <div className='formBottom'>
                    <Button className='submit' type="submit" value="Submit" variant="contained">Update</Button>
                </div>
            </form>
            </Card>

            <Card className='card2'>
                <div className='tableProfile'>
                <h3>Appointment</h3>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              selectionModel={selectionModel}
                                              hideFooterSelectedRowCount
                                              onSelectionModelChange={onRowSelect}
                                              
                                          />
                          </div>

                          <div className='tableButtons'>

                            <Button variant="outlined" onClick={deleteRow} startIcon={<DeleteIcon />}>
                              Delete
                            </Button>

                          </div>
            </Card>

            <Card className='card2'>
            <div className='tableProfile'>
                <h3>Messages</h3>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              selectionModel={selectionModel1}
                                              hideFooterSelectedRowCount
                                              onSelectionModelChange={onRowSelect1}
                                              
                                          />
                          </div>

                          <div className='tableButtons'>

                          <Button variant="contained" startIcon={<VisibilityIcon />}>
                              View
                            </Button>

                          </div>
                
            </Card>
        </div>

        



  </div>
  
    


</div>

</div>

        </>

    )


}