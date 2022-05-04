import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Admin_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Box } from '@mui/system';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export default function UserAdmin() {


    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [date8, setDate8] = useState(null);
    const [date3, setDate3] = useState(null);
    const [value1, setValue1] = useState('');
    const [stat,setStat] = useState(null);

    const status = [{name: 'Student'},{name: 'Supervisor'}]

    

    let rows = [
        { id: 1, date: "17/04/2022", name: "RAD"},
        { id: 2, date: "18/04/2022", name: "SDD"},
        { id: 1, date: "17/04/2022", name: "RAD"},
        { id: 2, date: "18/04/2022", name: "SDD"},
        { id: 1, date: "17/04/2022", name: "RAD"},
        { id: 2, date: "18/04/2022", name: "SDD"},
        { id: 1, date: "17/04/2022", name: "RAD"},
        { id: 2, date: "18/04/2022", name: "SDD"},
        { id: 1, date: "17/04/2022", name: "RAD"},
        { id: 2, date: "18/04/2022", name: "SDD"},
        { id: 1, date: "17/04/2022", name: "RAD"},
        { id: 2, date: "18/04/2022", name: "SDD"},
        { id: 1, date: "17/04/2022", name: "RAD"},
        { id: 2, date: "18/04/2022", name: "SDD"},
        { id: 1, date: "17/04/2022", name: "RAD"},
        { id: 2, date: "18/04/2022", name: "SDD"}
      ];

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
   
  <Card style={{marginTop:'5rem', paddingBottom:'2rem', width:'80%',height:'50rem'}} className='card2'>
    <div className="table" style={{width:'100%',height:'40rem'}}>
        <h3>Documents</h3>
                        <DataTable value={rows} paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={7}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column field="id" header="id" style={{ width: '25%' }}></Column>
                        <Column field="date" header="date" style={{ width: '25%' }}></Column>
                        <Column field="name" header="name" style={{ width: '25%' }}></Column>
                        <Column header="Edit" body={actionEdit}></Column>
                        </DataTable>
                    </div>
                    </Card>
                   <Dialog visible={docDialog} style={{ width: '450px' }} header="Document Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                <div className="field">
                    <label htmlFor="name">{doc ? doc.name:null}</label>
                </div>
                <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Role:
                        </label>
                            <Dropdown value={stat} options={status} onChange={(e)=>{setStat(e.value)}} optionLabel="name" placeholder="Select Role" />
                        </div>
                </Dialog>
    
  </div>

</div>

</div>
      </>
    )
}