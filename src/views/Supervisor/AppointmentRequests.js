import * as React from 'react';
import {useState, useRef, useEffect} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import {Button} from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import Unauthorized from '../Warnings/Unauthorized';


export default function AppointmentRequests() {

  let userEmail = sessionStorage.getItem("email");
  const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
  const toast = useRef(null);
  let tok = sessionStorage.getItem("token");
  const config = {
    headers: { Authorization: `bearer ${tok}` }
};

const [rows, setRows] = useState([]);

const getHours = async () => {
        await axios.get(`https://localhost:7084/api/Supervisor/GetMeetingRequests/${userEmail}`,config).then(response => {
                  
                  response.data.map(function(x){
                      return setRows(prevRow => ([...prevRow,{id:x.id, date:x.date.split('T')[0], hour:x.date.split('T')[1], group:x.groupName}]))
                    
                  })
                }).catch(error => {
    
              });;  
      }

  useEffect(()=>{
        
    getHours(); 
    setPageRole(sessionStorage.getItem("role"));

},[]);

const ApproveMeeting = async () => {
  let tok = sessionStorage.getItem("token");
  const config = {
    headers: { Authorization: `bearer ${tok}` }
};
  await axios.get(`https://localhost:7084/api/Supervisor/CreateMeetings/${selectedProduct5.id}`,config).then(res => {
    toast.current.show({ severity: 'info', summary: 'Approved', life: 3000 });
              getHours();
    })
  };

  const reject = async () => {
    await axios.get(`https://localhost:7084/api/Supervisor/RejectMeetings/${selectedProduct5.id}`,config).then(response => {
              toast.current.show({ severity: 'info', summary: 'Rejected', life: 3000 });
              getHours();
              
            }).catch(error => {
              
          });;  
  }
  



  
  const [selectedProduct5, setSelectedProduct5] = useState(null);


    return(
        <>
        { pageRole=="supervisor" ? 
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Meeting Requests</title>
      </Helmet>

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
                    <Column field="group" header="Group Name"></Column>
                </DataTable>
          </Card>
          <div className="buttonArea" style={{marginTop:'0rem'}}>
          <Button label='Approve' className="p-button-raised p-button-success" onClick={ApproveMeeting} style={{marginTop:'6rem',marginBottom:'1rem',marginRight:'1rem'}} icon="pi pi-check">
                            </Button>
          <Button label="Reject" variant="contained" className="p-button-raised p-button-danger" onClick={reject} style={{marginTop:'6rem',marginBottom:'1rem'}} icon="pi pi-times">
          </Button>
          </div>
   </div>
  </div>

</div>

</div> : <Unauthorized></Unauthorized>}
      </>
    )
}