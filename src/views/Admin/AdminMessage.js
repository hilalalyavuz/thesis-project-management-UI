import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Admin_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import {Button} from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useEffect} from 'react';
import axios from 'axios';
import { createBrowserHistory } from 'history';  
import {Toast} from 'primereact/toast';
import { TabMenu } from 'primereact/tabmenu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import { Dialog } from 'primereact/dialog';
import '../../css/Message.css';
import { Helmet } from 'react-helmet';

export default function AdminMessage() {

  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };

  const toast = useRef(null);

  const [selectedProduct5, setSelectedProduct5] = useState(null);
  const [rows2, setRows2] = useState([]);
  const [tab, setTab] = useState(true);
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [active,setActive] = useState();
  
  const [doc,setDoc] = useState(null);
  const [docDialog, setDocDialog] = useState(false);
  const [docRowTopic, setDocRowTopic] = useState("");
  const [docRowMessage, setDocRowMessage] = useState("");
  const [response1,setResponse] = useState();
  const [disp,setDisp] = useState();
  const items = [
    {label: 'Received', icon: 'pi pi-comment'},
    {label: 'Sent', icon: 'pi pi-send'}
];

const editDoc = () =>{
    setDoc(selectedProduct5 ? selectedProduct5: null);
    setDocRowTopic(selectedProduct5 ? selectedProduct5.topic : "");
    setDocRowMessage(selectedProduct5 ? selectedProduct5.message : "");
    setDocDialog(true);
    if(tab && selectedProduct5.status_id=="NEW" || selectedProduct5.status_id=="new"){
         axios.get(`https://localhost:7084/api/Supervisor/ChangeStatusOfMessage/${selectedProduct5.id}`,config).then(result =>{
        getMessagesSent();
        getMessagesRec();
    });
    }
   
  }

const sendResponse = () =>{
    axios.post(`https://localhost:7084/api/Supervisor/AddResponse/${selectedProduct5.id}`,{response:response1, topic:doc.topic,
        message:doc.message, status_id:doc.status_id},config).then(result =>{
        getMessagesSent();
        getMessagesRec();
    });
    setDocDialog(false);
    setTab(false);
}

const statusBodyTemplate = (rowData) => {
    return <span className={`customer-badge status-${rowData.status_id}`}>{rowData.status_id}</span>;
}
 
  const docDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDocDialog(false);setDoc(null);setResponse("")}} />
        <Button label="Send" disabled={tab ? false: true} icon="pi pi-send" className="p-button-text" onClick={sendResponse}/>
    </React.Fragment>
  );

  const getMessagesRec = async () => {
    await axios.get(`https://localhost:7084/api/Supervisor/SupervisorProfileMessageReceived/${userEmail}`,config).then(response => {
        setReceived(response.data);
    });
  }
  const getMessagesSent = async () => {
    await axios.get(`https://localhost:7084/api/Supervisor/SupervisorProfileMessageSent/${userEmail}`,config).then(response => {
        setSent(response.data);
    });
  }
  useEffect(()=>{
   
    getMessagesSent();
    getMessagesRec();

},[]);


    return(
        <>
        <div className='Page'>
          
<Helmet>
        <title>Thesis Tracker | Messages</title>
</Helmet>
        <Toast ref={toast} />

<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
   <div style={{width:'80%',marginTop:'2rem'}}>
     <div>
       <h3>Messages</h3>
     </div>
     <TabMenu model={items} onTabChange={(e)=>{ if(e.value.label =="Sent"){
        setTab(false);
        setDisp("none");
    }else{
        setTab(true);
        setDisp("");
    }setActive(e.index)}} activeIndex={active} />
   <Card>
       {tab ? <DataTable value={received} paginator responsiveLayout="scroll" selection={selectedProduct5} onSelectionChange={e => setSelectedProduct5(e.value)} dataKey="id"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,30]}>
                    <Column selectionMode="single" headerStyle={{width: '1%'}}></Column>
                    <Column field="from_user_name" header="From" style={{width:'20%'}}></Column>
                    <Column field="topic" header="Topic" style={{width:'20%'}}></Column>
                    <Column field="message" header="Message" style={{width:'40%'}}></Column>
                    <Column field="status_id" header="Status" style={{ minWidth: '10rem' }} body={statusBodyTemplate}/>
                </DataTable> : <DataTable value={sent} paginator responsiveLayout="scroll" selection={selectedProduct5} onSelectionChange={e => setSelectedProduct5(e.value)} dataKey="id"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,30]}>
                    <Column selectionMode="single" headerStyle={{width: '1%'}}></Column>
                    <Column field="to_user_name" header="To" style={{width:'20%'}}></Column>
                    <Column field="topic" header="Topic" style={{width:'20%'}}></Column>
                    <Column field="message" header="Message" style={{width:'40%'}}></Column>
                    <Column field="status_id" header="Status" style={{ minWidth: '10rem' }} body={statusBodyTemplate}/>
                </DataTable> }
          </Card>
          <div className="buttonArea" style={{marginTop:'1rem'}}>
          
          <Button variant="contained" onClick={editDoc} icon="pi pi-eye" label="  VIEW" className='p-button-raised'>
                            </Button>
                            <Dialog visible={docDialog} style={{ width: '450px' }} header="Message Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                <div className="field">
                    <label htmlFor="name">{doc ? doc.name:null}</label>
                </div>
                <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Topic:
                        </label>
                            {docRowTopic}
                            </div>

                            <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Message:
                        </label>
                           {docRowMessage}
                        </div>
                        <div style={{marginTop:'1rem',display:disp}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem',marginBottom:'1rem'}}>
                             Response:
                        </label>
                        <TextField sx={{marginTop:'0rem'}}
                multiline
                rows={6}
                fullWidth
                value={response1}
                onChange={(e)=>{setResponse(e.target.value)}}
                style={{marginTop:'0.5rem'}}
        />
                        </div>
                </Dialog>
          </div>
   </div>
  
    
  </div>

</div>

</div>
      </>
    )
}