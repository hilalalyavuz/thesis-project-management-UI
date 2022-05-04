import * as React from 'react';
import {useState} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressBar } from 'primereact/progressbar';

export default function Students() {

    const rows = [
        {
            "ID": 1,
            "Name": "Deniz",
            "Email": "deniz@email",
            "Group":1,
            "Progress":40
              
        },
        {
            "ID": 2,
            "Name": "Hilal",
            "Email": "hilal@email",
            "Group":2,
            "Progress":60
        }
      ];

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
                        <DataTable value={rows} paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column field="ID" header="ID" style={{ width: '25%' }}></Column>
                        <Column field="Name" header="Name" style={{ width: '25%' }}></Column>
                        <Column field="Email" header="Email" style={{ width: '25%' }}></Column>
                        <Column field="Group" header="Group" style={{ width: '25%' }}></Column>
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