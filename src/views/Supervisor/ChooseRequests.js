import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import {Button} from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useEffect} from 'react';
import axios from 'axios';
import { createBrowserHistory } from 'history';  
import {Toast} from 'primereact/toast';
import { Helmet } from 'react-helmet';

export default function ChooseRequests() {

  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };

  const toast = useRef(null);
  const [data,setData] = useState();

  const [selectedProduct5, setSelectedProduct5] = useState(null);

  const accept = ()=>{
        axios.post(`https://localhost:7084/api/Supervisor/ChooseRequests/Accept/${userEmail}`,{'id':selectedProduct5.id, 'group_id':selectedProduct5.group_id, 'supervisor_id':selectedProduct5.supervisor_id},config)
        .then((result)=>{
          if(result.data == true){
            toast.current.show({severity:'success', detail:"Choose request successfully accepted.", life: 5000});
            createBrowserHistory().push('/ChooseRequests');
            window.location.reload();
          }else{
            toast.current.show({severity:'warn', detail:"You don't have available capacity.", life: 3000});
          }
          
        });
  }

  const reject = ()=>{
    axios.post(`https://localhost:7084/api/Supervisor/ChooseRequests/Reject/${userEmail}`,{'id':selectedProduct5.id, 'group_id':selectedProduct5.group_id, 'supervisor_id':selectedProduct5.supervisor_id},config)
    .then((result)=>{
      if(result.data == true){
        toast.current.show({severity:'success', detail:"Choose request successfully rejected.", life: 5000});
        createBrowserHistory().push('/ChooseRequests');
        window.location.reload();
      }else{
        toast.current.show({severity:'warn', detail:"There is some error while rejecting.", life: 3000});
      }
      
    });
}

  useEffect(()=>{
    async function getData(){
        await axios.get(`https://localhost:7084/api/Supervisor/ChooseRequests/${userEmail}`,config).then((result)=>{
            setData(result.data);
        });
    }
    getData();

},[]);


    return(
        <>
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Choose Requests</title>
        </Helmet>
        <Toast ref={toast} />

<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
   <div style={{width:'80%',marginTop:'2rem'}}>
     <div>
       <h3>Choose Requests</h3>
     </div>
   <Card>
          <DataTable value={data} paginator responsiveLayout="scroll" selection={selectedProduct5} onSelectionChange={e => setSelectedProduct5(e.value)} dataKey="id"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,30]}>
                    <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
                    <Column field="group_id" header="Group ID"></Column>
                    <Column field="persons_name" header="Names"></Column>
                </DataTable>
          </Card>
          <div className="buttonArea" style={{marginTop:'0rem'}}>
          <Button label='Approve' className=" p-button-raised p-button-success" onClick={accept} style={{marginTop:'6rem',marginBottom:'1rem',marginRight:'1rem'}} icon="pi pi-check">
                            </Button>
          <Button label="Reject" className="p-button-raised p-button-danger" onClick={reject} style={{marginTop:'6rem',marginBottom:'1rem'}} icon="pi pi-times">
          </Button>
          </div>
   </div>
  
    
  </div>

</div>

</div>
      </>
    )
}