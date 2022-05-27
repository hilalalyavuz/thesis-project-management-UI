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

      const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
      const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;


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
   
  <Card style={{marginTop:'5rem',width:'80%'}} className='card'>
    <div className="table" style={{width:'100%'}}>
        <h3>Students</h3>
                        <DataTable value={rows2} paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column field="id" header="ID" style={{ width: '25%' }}></Column>
                        <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                        <Column field="email" header="Email" style={{ width: '25%' }}></Column>
                        <Column field="group" header="Group" style={{ width: '25%' }}></Column>
                        <Column header="Progress" body={showProgress}></Column>
                        </DataTable>
                    </div>
                    </Card>
  </div>

</div>

</div>
      </>
    )
}