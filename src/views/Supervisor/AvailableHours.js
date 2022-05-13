import * as React from 'react';
import {useState, useEffect} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Box } from '@mui/system';
import { Calendar } from 'primereact/calendar';
import axios from 'axios';

export default function AppointmentRequests() {


    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [date8, setDate8] = useState(null);
    const [date3, setDate3] = useState(null);
    const [data,setData] = useState();

    useEffect(()=>{
        async function getData(){
            await axios.get('https://localhost:7084/api/User').then((result)=>{
                setData(result.data);
            });
        }
        getData();

    },[]);
      const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
      const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

      const actionEdit = (rowData) => {
        return(
            <React.Fragment>
               <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editDoc(rowData)} />
            </React.Fragment>
        );
    }

    const editDoc = (doc) =>{
        setDoc({...doc});
        setDocDialog(true);
    }

    const docDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDocDialog(false)}} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={()=>{console.log("saved")}}/>
        </React.Fragment>
    );

    return(
        <>
        <div className='Page'>

<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
   
  <Card style={{marginTop:'5rem'}} className='card'>
    <div className="table" style={{height:'-webkit-fill-available'}}>
        <h3>My Available Hours</h3>
                        <DataTable value={data} paginator scrollable
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column field="id" header="id" style={{ width: '25%' }}></Column>
                        <Column field="name" header="date" style={{ width: '25%' }}></Column>
                        <Column field="surname" header="hour" style={{ width: '25%' }}></Column>
                        <Column header="Edit" body={actionEdit}></Column>
                        </DataTable>
                    </div>
                    </Card>
                    <Card style={{marginTop:'2rem'}} className='card'>
                    <div>
                        <form>
                            <Box>
                        <h3>Create Availability</h3>
                        <div className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Date:
                        </label>
                            <Calendar id="icon" value={date3} onChange={(e) => setDate3(e.value)} showIcon />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Hour:
                        </label>
                        <Calendar id="time24" value={date8} onChange={(e) => setDate8(e.value)} showIcon timeOnly hourFormat="24" />
                    </div>
                    
                        
                            </Box>
                        
                        <div style={{marginTop:'2rem',justifyContent:'center',display:'flex'}}>
                            <Button style={{backgroundColor:'#50C878', borderColor:'#50C878'}} type="submit" value="Submit" variant="contained">Create</Button>
                        </div>
                        
                        </form>
          
          </div>
                    </Card>
                   <Dialog visible={docDialog} style={{ width: '450px' }} header="Document Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                <div className="field">
                    <label htmlFor="name">{doc ? doc.name:null}</label>
                </div>
                <div className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Date:
                        </label>
                            <Calendar id="icon" value={date3} onChange={(e) => setDate3(e.value)} showIcon />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Hour:
                        </label>
                        <Calendar id="time24" value={date8} onChange={(e) => setDate8(e.value)} showIcon timeOnly hourFormat="24" />
                    </div>
                </Dialog>
    
  </div>

</div>

</div>
      </>
    )
}