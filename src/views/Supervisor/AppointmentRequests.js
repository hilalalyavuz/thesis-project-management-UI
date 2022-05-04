import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AppointmentRequests() {



  let rows = [
    { id: 1, date: "17/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"}
  ];
  const [selectedProduct5, setSelectedProduct5] = useState(null);


    return(
        <>
        <div className='Page'>

<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
   
  <Card className="card" style={{width:'80%'}}>
          <div className="table" style={{width:'100%',height:'30rem'}}>
          <h3>Appointment</h3>
          <DataTable value={rows} selection={selectedProduct5} onSelectionChange={e => setSelectedProduct5(e.value)} dataKey="id" responsiveLayout="scroll">
                    <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
                    <Column field="date" header="Date"></Column>
                    <Column field="hour" header="Hour"></Column>
                </DataTable>
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