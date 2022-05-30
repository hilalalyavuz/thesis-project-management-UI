import * as React from 'react';
import {useState} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressBar } from 'primereact/progressbar';
import {useEffect} from 'react';
import axios from 'axios';


export default function Students() {


    let userEmail = sessionStorage.getItem("email");
    let tok = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `bearer ${tok}` }
  };
    const[rows2, setRows2] = useState([]);

    useEffect(()=>{
        async function getData(){
            await axios.get(`https://localhost:7084/api/Supervisor/SupervisorStudents/${userEmail}`,config).then((response)=>{
                response.data.map(function(x){
                      return setRows2(prevRow => ([...prevRow,{id:x.id, name:x.name+" "+x.surname, email:x.email, group:x.group_id}]));
                  })
            });
        }
        getData();
    
    },[]);

    const showProgress = (rowData)=>(
        <React.Fragment>
            <ProgressBar value={rowData.Progress}></ProgressBar>
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
   <div style={{marginTop:'2rem',width:'80%'}}>
       <div>
          <h3>Students</h3> 
        </div>
   <Card>
        
                        <DataTable value={rows2} paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}>
                        <Column field="id" header="ID" style={{ width: '10%' }}></Column>
                        <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                        <Column field="email" header="Email" style={{ width: '25%' }}></Column>
                        <Column field="group" header="Group" style={{ width: '25%' }}></Column>
                        <Column header="Status" body={showProgress}></Column>
                        </DataTable>
                    </Card>
   </div>
  </div>

</div>

</div>
      </>
    )
}