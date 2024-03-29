import * as React from 'react';
import {useState, useEffect, useRef } from 'react'
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
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { Helmet } from 'react-helmet';
import { Toast } from 'primereact/toast';
import Unauthorized from '../Warnings/Unauthorized';

export default function MakeAppointment() {

  
  const [date2, setDate2] = useState(null);
  const [rows, setRows] = useState([]);
  const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
  const [rows2, setRows2] = useState([]);
  const [filterDate, setFilterDate] = useState();
  const [filterValue, setFilterValue] = useState('');
  const toast = useRef(null);
  
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");
  const config = {
      headers: { Authorization: `bearer ${tok}` }
  };

  const getHours = async () => {
    await axios.get(`https://localhost:7084/api/Student/AvailableHours/${userEmail}`,config).then(response => {
              let today = new Date();
              response.data.map(function(x){
                let r2 = new Date(x.available_date);
                if(x.is_visible == 0 && today<=r2){
                  return setRows2(prevRow => ([...prevRow,{id:x.id, date:x.available_date.split('T')[0], hour:x.available_date.split('T')[1]}]))
                }
              })
            }).catch(error => {

          });;  
  }

  useEffect(() => { 
  getHours();  
  setPageRole(sessionStorage.getItem("role"));
}, []);

const send = async () => {
  await axios.post(`https://localhost:7084/api/Student/MeetingRequests/${userEmail}`,
        {
            "available_id": selectionModel[0]
          },config).then(response => {

            toast.current.show({ severity: 'info', summary: 'Submitted', life: 3000 });
            window.location.reload();
            
          }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Failed to submit', life: 3000 });
        });;  
}

const dateSelection = (event) => {
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  setFilterValue('equals')
  setFilterDate(convert(event.value))
}

const deleteFilter = () =>{
  setFilterValue('')
  setFilterDate()
}

  const columns = [
    { field: "date", headerName: "Date", width: 200 },
    { field: "hour", headerName: "Hour", width: 200 },
  ];

  const [selectionModel, setSelectionModel] = useState([]);


    return(
        <>
        
        <Toast ref={toast} />
        { pageRole=="student" ?
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Appointment</title>
      </Helmet>

<div className='Sidebar'>
    <Sidebar dname='MakeApp'/>
</div>

<div className='Main'>
  <div className='Main2'>

 
    
  <Card className="card" style={{width:'70%',height:'50rem',marginTop:'6rem'}}>
  <h3 style={{marginBottom:'1rem'}}>Appointment</h3>
  <div className="field col-12 md:col-4" style={{marginTop:'2rem',marginBottom:'2rem'}}>
                        <label htmlFor="basic">Date Filter: </label>
                        <Calendar id="basic" value={date2} onChange={dateSelection} dateFormat="yy-mm-dd" showIcon />
                        <Button onClick={deleteFilter}>Delete Filter</Button>
                    </div>

          <div className="table" style={{width:'90%', height:'100%'}}>
          
            <DataGrid
              rows={rows2}
              columns={columns}
              pageSize={5}
              checkboxSelection
              filterModel={{
                items: [{ columnField: 'date', operatorValue: filterValue , value: filterDate }],
              }}
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
          <Button variant="contained" style={{marginBottom:'1rem'}} onClick={send}>
                              SUBMIT
                            </Button>
          </div>
          </Card>
    
  </div>
  
    


</div>

</div> : <Unauthorized></Unauthorized>}

        





      </>
    )
}