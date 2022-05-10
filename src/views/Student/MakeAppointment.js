import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { AspectRatio } from '@mui/icons-material';

export default function MakeAppointment() {

  
  const [date2, setDate2] = useState(null);
  

  let rows = [
    { id: 1, date: "17/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"}
  ];
  const columns = [
    { field: "date", headerName: "Date", width: 200 },
    { field: "hour", headerName: "Hour", width: 200 },
  ];

  const [selectionModel, setSelectionModel] = useState([]);


    return(
        <>
        <div className='Page'>

<div className='Sidebar'>
    <Sidebar dname='MakeApp'/>
</div>

<div className='Main'>
  <div className='Main2'>

 
    
  <Card className="card" style={{width:'70%',height:'50rem',marginTop:'6rem'}}>
  <h3 style={{marginBottom:'1rem'}}>Appointment</h3>
  <div className="field col-12 md:col-4" style={{marginTop:'2rem',marginBottom:'2rem'}}>
                        <label htmlFor="basic">Date Filter: </label>
                        <Calendar id="basic" value={date2} onChange={(e) => setDate2(e.value)} dateFormat="mm-dd-yy" showIcon />
                    </div>

          <div className="table" style={{width:'90%', height:'100%'}}>
          
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
          <div className="buttonArea" style={{marginTop:'0rem'}}>
          <Button variant="contained" style={{marginBottom:'1rem'}}>
                              SUBMIT
                            </Button>
          </div>
          </Card>
    
  </div>
  
    


</div>

</div>

        





      </>
    )
}