import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import {Button} from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AppointmentRequests() {



  let rows = [
    { id: 1, date: "17/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
    { id: 2, date: "18/04/2022", hour: "10:30"},
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
   <div style={{width:'80%',marginTop:'2rem'}}>
     <div>
        <h3>Appointment Requests</h3>
     </div>
   <Card>
          <DataTable value={rows} selection={selectedProduct5} paginator onSelectionChange={e => setSelectedProduct5(e.value)} dataKey="id" responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,30]}>
                    <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
                    <Column field="date" header="Date"></Column>
                    <Column field="hour" header="Hour"></Column>
                </DataTable>
          </Card>
          <div className="buttonArea" style={{marginTop:'0rem'}}>
          <Button label='Approve' className="p-button-raised p-button-success" style={{marginTop:'6rem',marginBottom:'1rem',marginRight:'1rem'}} icon="pi pi-check">
                            </Button>
          <Button label="Reject" variant="contained" className="p-button-raised p-button-danger" style={{marginTop:'6rem',marginBottom:'1rem'}} icon="pi pi-times">
          </Button>
          </div>
   </div>
  </div>

</div>

</div>
      </>
    )
}