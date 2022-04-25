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

  const [dates2, setDates2] = useState(null);


  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  const setDates = async () =>{
    console.log(dates2)
    let rows2 = [];
    if(dates2.length === 2){
      dates2[0] = formatDate(dates2[0])
      dates2[1] = formatDate(dates2[1])
      rows.forEach(myFunction);
      function myFunction(value, index, array) {
        if(value.date > dates2[0] && value.date < dates2[1]){
          console.log(value)
          rows2.push({ id: index, date: value.date, hour: value.hour})
        }
      }
      DataGrid.rows = rows2
    }

  }

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
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>

  <div className="field col-12 md:col-4">
                        <label htmlFor="range">Range</label>
                        <Calendar id="range" value={dates2} onSelect={setDates} onChange={(e) => setDates2(e.value)} selectionMode="range" readOnlyInput />
                    </div>
    
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
          <Button variant="contained" style={{marginTop:'6rem',marginBottom:'1rem'}}>
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