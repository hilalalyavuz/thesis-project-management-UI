import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import { DataGrid } from "@mui/x-data-grid";
import { Card } from '@mui/material';
import Button from '@mui/material/Button';

export default function AppointmentRequests() {

  const [selectionModel, setSelectionModel] = useState([]);

  let rows = [
    { id: 1, date: "17/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"}
  ];
  const columns = [
    { field: "date", headerName: "Date", width: 200 },
    { field: "hour", headerName: "Hour", width: 200 },
  ];


    return(
        <>
        <div className='Page'>

<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
   
  <Card className="card">
          <div className="table">
          <h3>Appointment</h3>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              selectionModel={selectionModel}
              hideFooterSelectedRowCount
              onSelectionModelChange={(selection) => {
                if (selection.length > 1) {
                  const selectionSet = new Set(selectionModel);
                  const result = selection.filter((s) => !selectionSet.has(s));

                  setSelectionModel(result);
                } else {
                  setSelectionModel(selection);
                }
              }}
            />
          </div>
          <div className="buttonArea">
          <Button variant="contained" style={{marginTop:'6rem',marginBottom:'1rem',marginRight:'1rem'}}>
                              Approve
                            </Button>
          <Button variant="contained" style={{marginTop:'6rem',marginBottom:'1rem'}}>
            Reject
          </Button>
          </div>
          </Card>
    
  </div>

</div>

</div>
      </>
    )
}