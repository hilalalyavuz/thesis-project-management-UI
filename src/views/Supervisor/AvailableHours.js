import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Box } from '@mui/system';
import { Calendar } from 'primereact/calendar';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { createBrowserHistory } from 'history';
import axios from 'axios';

export default function AppointmentRequests() {


    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [date8, setDate8] = useState(null);
    const [date9, setDate9] = useState(null);
    const [date3, setDate3] = useState(null);
    const [date2, setDate2] = useState(null);
    const [date4, setDate4] = useState(null);
    const [rows2, setRows2] = useState([]);
    const [data,setData] = useState();
    const toast = useRef(null);
    let userEmail = sessionStorage.getItem("email");
    let tok = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `bearer ${tok}` }
  };

    const [duration, setDuration] = useState('');

    const onDurationChange = (e) => {
        setDuration(e.value);
    }

    useEffect(()=>{
        
        const getHours = async () => {
            console.log(config)
            await axios.get(`https://localhost:7084/api/Supervisor/AvailableHours/${userEmail}`,config).then(response => {
                      
                      response.data.map(function(x){
                        if(x.is_visible == 1){
                          return setRows2(prevRow => ([...prevRow,{id:x.id, date:x.available_date.split('T')[0], hour:x.available_date.split('T')[1]}]))
                        }
                      })
                    }).catch(error => {
        
                  });;  
          }
        getHours(); 

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

    const createAvailable = async () => {
        let date = date3.toLocaleDateString('en-GB').split('/').reverse().join('-');
        let startHour = date8.toLocaleTimeString('en-GB').split(':');
        startHour[2]="00";
        startHour = startHour.join(':');
        startHour = date+'T'+startHour;
        let endHour = date9.toLocaleTimeString('en-GB').split(':');
        endHour[2]="00";
        endHour = endHour.join(':');
        endHour = date+'T'+endHour;

        await axios.post(`https://localhost:7084/api/Supervisor/AddAvailableHours/${userEmail}`,
            {
                "start": startHour,
                "end": endHour,
                "duration": duration.code
              },config).then(response => {
                toast.current.show({severity:'success', summary: 'Available Hours Added', life: 3000});
              }).catch(error => {
                toast.current.show({severity:'error', summary: 'Failed to Add', life: 3000});
            });;  

      }

      const setAvailableHours = async () => {
          let date = date2.toLocaleDateString('en-GB').split('/').reverse().join('-');
          let datee = date4.toLocaleTimeString('en-GB').split(':');
          datee[2]="00";
          datee = datee.join(':');
          datee = date+'T'+datee;
          console.log(doc.id)
        await axios.patch(`https://localhost:7084/api/Supervisor/SetAvailableHours/${userEmail}`,
              {
                  "id": doc.id,
                  "available_date": datee
                },config).then(response => {
      
                  createBrowserHistory().push('/AvailableHours');
                  window.location.reload();
                  
                }).catch(error => {
                  
              });;  
      }

    const editDoc = (doc) =>{
        setDoc({...doc});
        setDocDialog(true);
    }

    const durations = [
        { name: '1 Hours', code: 'saat' },
        { name: '30 Minutes', code: 'dakika' },
    ];

    const docDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDocDialog(false)}} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={setAvailableHours}/>
        </React.Fragment>
    );

    return(
        <>
        <div className='Page'>
        <Toast ref={toast} />

<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
   
  <Card style={{marginTop:'5rem'}} className='card'>
    <div className="table" style={{height:'-webkit-fill-available'}}>
        <h3>My Available Hours</h3>
                        <DataTable value={rows2} paginator scrollable
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column field="id" header="id" style={{ width: '25%' }}></Column>
                        <Column field="date" header="date" style={{ width: '25%' }}></Column>
                        <Column field="hour" header="hour" style={{ width: '25%' }}></Column>
                        <Column header="Edit" body={actionEdit}></Column>
                        </DataTable>
                    </div>
                    </Card>
                    <Card style={{marginTop:'2rem'}} className='card'>
                    <div>
                        <div>
                            <Box>
                        <h3>Create Availability</h3>
                        <div className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Date:
                        </label>
                            <Calendar id="icon" value={date3} onChange={(e) => setDate3(e.value)} dateFormat="yy-mm-dd" showIcon />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Start:
                        </label>
                        <Calendar id="time24" value={date8} onChange={(e) => setDate8(e.value)} showIcon icon={<QueryBuilderIcon/>} timeOnly hourFormat="24" />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1.3rem'}}>
                             End:
                        </label>
                        <Calendar id="time24" value={date9} onChange={(e) => setDate9(e.value)} showIcon icon={<QueryBuilderIcon/>} timeOnly hourFormat="24" />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Duration:
                        </label>
                            <Dropdown value={duration} options={durations} onChange={onDurationChange} optionLabel="name" placeholder="Select Duration" />
                        </div>
                    
                        
                            </Box>
                        
                        <div style={{marginTop:'2rem',justifyContent:'center',display:'flex'}}>
                            <Button style={{backgroundColor:'#50C878', borderColor:'#50C878'}} onClick={createAvailable} variant="contained">Create</Button>
                        </div>
                        
                        </div>
          
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
                            <Calendar id="icon" value={date2} onChange={(e) => setDate2(e.value)} showIcon />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Hour:
                        </label>
                        <Calendar id="time24" value={date4} onChange={(e) => setDate4(e.value)} showIcon timeOnly hourFormat="24" />
                    </div>
                </Dialog>
    
  </div>

</div>

</div>
      </>
    )
}