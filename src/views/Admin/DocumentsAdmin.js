import * as React from 'react';
import {useState, useEffect} from 'react';
import Sidebar from '../../components/Admin_Sidebar';
import '../../css/Common.css';
import { Card } from '@mui/material';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Box } from '@mui/system';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

export default function DocumentsAdmin() {


    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [date8, setDate8] = useState(null);
    const [date3, setDate3] = useState(null);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [rows, setRows] = useState([]);
    let userEmail = sessionStorage.getItem("email");
    let tok = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `bearer ${tok}` }
    };

    useEffect(() =>{
        async function getData(){
            await axios.get(`https://localhost:7084/api/Admin/GetDocumentTypes/`,config).then((result)=>{
                result.data.map(x =>{
                    let y = x.deadline.split('T')[1];
                    let z = x.deadline.split('T')[0];
                    setRows(old => ([...old, {id:x.id, department:x.department,name:x.name, deadline:z, hour:y}]));
                });
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
   
  <Card style={{marginTop:'2rem', paddingBottom:'2rem', width:'80%'}} className='card2'>
    <div className="table" style={{width:'100%',height:'-webkit-fill-available'}}>
        <h3>Documents</h3>
                        <DataTable value={rows} paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,20]}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column field="id" header="ID" style={{ width: '10%' }}></Column>
                        <Column field="department" header="Department" style={{ width: '20%' }}></Column>
                        <Column field="name" header="Name" style={{ width: '20%' }}></Column>
                        <Column field="deadline" header="Deadline" style={{ width: '20%' }}></Column>
                        <Column field="hour" header="Hour" style={{ width: '20%' }}></Column>
                        <Column header="Edit" body={actionEdit}></Column>
                        </DataTable>
                    </div>
                    </Card>
                    <Card style={{marginTop:'2rem',width:'40%'}} className='card'>
                    <div>
                        <form>
                            <Box>
                        <h3>Create Document</h3>
                        <div className="field col-12 md:col-4">
                        <label style={{marginRight:'1.5rem'}}>
                             Date:
                        </label>
                            <Calendar id="icon" value={date3} onChange={(e) => setDate3(e.value)} showIcon />
                        </div>
                        <div className="field col-12 md:col-4" style={{marginTop:'1rem'}}>
                        <label style={{marginRight:'1.3rem'}}>
                             Hour:
                        </label>
                        <Calendar id="time24" value={date8} onChange={(e) => setDate8(e.value)} showIcon icon={<QueryBuilderIcon/>} timeOnly hourFormat="24" />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Name:
                        </label>
                        <InputText value={value1} onChange={(e) => setValue1(e.target.value)} />
                    </div>
                    <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1.5rem'}}>
                             Dept:
                        </label>
                        <InputText value={value2} onChange={(e) => setValue2(e.target.value)} />
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
                        <div className="field col-12 md:col-4" style={{marginTop:'1rem'}}>
                        <label style={{marginRight:'1.3rem'}}>
                             Hour:
                        </label>
                        <Calendar id="time24" value={date8} onChange={(e) => setDate8(e.value)} showIcon icon={<QueryBuilderIcon/>} timeOnly hourFormat="24" />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Name:
                        </label>
                        <InputText value={value1} onChange={(e) => setValue1(e.target.value)} />
                    </div>
                    <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1.5rem'}}>
                             Dept:
                        </label>
                        <InputText value={value2} onChange={(e) => setValue2(e.target.value)} />
                    </div>
                </Dialog>
    
  </div>

</div>

</div>
      </>
    )
}