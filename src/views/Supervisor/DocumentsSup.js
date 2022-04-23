import React, { useState} from 'react';
import { Dropdown } from 'primereact/dropdown';
import Sup_Sidebar from '../../components/Sup_Sidebar';
import { Button } from 'primereact/button';
import { Card } from '@mui/material';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';

export default function DocumentSup(){
    
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [value1, setValue1] = useState('');
    const [stat,setStat] = useState(null);
    const [rating,setRating] = useState(null);

    const rows = [
        {
            "id": 1000,
            "name": "James Butt",
            "country": {
                "name": "Algeria",
                "code": "dz"
            },
            "company": "Benton, John B Jr",
            "date": "2015-09-13",
            "status": "unqualified",
            "verified": true,
            "activity": 17,
            "representative": {
                "name": "Ioni Bowcher",
                "image": "ionibowcher.png"
            },
            "balance": 70663
        },
        {
            "id": 1001,
            "name": "Josephine Darakjy",
            "country": {
                "name": "Egypt",
                "code": "eg"
            },
            "company": "Chanay, Jeffrey A Esq",
            "date": "2019-02-09",
            "status": "proposal",
            "verified": true,
            "activity": 0,
            "representative": {
                "name": "Amy Elsner",
                "image": "amyelsner.png"
            },
            "balance": 82429
        }
      ];
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const status = [{name: 'accepted'},{name: 'rejected'}]

    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }

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

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    
    return(
        <div className='Page'>
            <div className='Sidebar'>
                <Sup_Sidebar />
            </div>
            <div className='Main'>
                <div className='Main3'>
                <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select a Group" />
                <Button label="Filter" aria-label="Submit"  />
                </div>
                <div>
                    <Card>
                        <DataTable value={rows} paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                        <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
                        <Column field="company" header="Company" style={{ width: '25%' }}></Column>
                        <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
                        <Column header="Status"></Column>
                        <Column header="Feedback"></Column>
                        <Column header="View"></Column>
                        <Column header="Edit" body={actionEdit}></Column>
                        </DataTable>
                    
                    </Card>
                </div>
                <Dialog visible={docDialog} style={{ width: '450px' }} header="Document Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                <div className="field">
                    <label htmlFor="name">{doc ? doc.name:null}</label>
                </div>
                <div className="field">
                    <label htmlFor="stat">Status</label>
                    <Dropdown value={stat} options={status} onChange={(e)=>{setStat(e.value)}} optionLabel="name" placeholder="Select a Status" />
                </div>
                <div className="field">
                    <label htmlFor="feedback">Feedback</label>
                    <InputTextarea id="feedback" onChange={(e) => setValue1(e.value)} required rows={3} cols={20} />
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Rating</label>
                        <Rating value={rating} onChange={(e) => setRating(e.value)} />
                    </div>
                </div>
                </Dialog>
            </div>
        </div>
    );
}