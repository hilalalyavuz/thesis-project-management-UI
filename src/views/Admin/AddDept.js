import * as React from 'react';
import {useState, useRef, useEffect} from 'react'
import Sidebar from '../../components/Admin_Sidebar';
import '../../css/Common.css'
import '../../css/ContactSupervisor.css'
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import Box from '@mui/material/Box';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import TextareaAutosize from '@mui/material/TextareaAutosize'; 
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Unauthorized from '../Warnings/Unauthorized';

export default function AddDept() {

  
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };
    const [state2, setState2] = useState([]);
    const [dept, setDept] = useState("");
    const [rows, setRows] = useState([]);
    const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
    const toast = useRef(null);
    const [value1, setValue1] = useState('');
    const [selectedProduct5, setSelectedProduct5] = useState(null);
    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);

      const handleChange2 = () => {
          axios.post(`https://localhost:7084/api/Admin/AddNewDept/`,{name:dept},config).then(response => {
            toast.current.show({severity:'success', summary: 'Success Message', detail:'New department added succesfully', life: 3000});
            window.location.reload();
          }).catch(error => {
            toast.current.show({severity:'error', summary: `Error: ${error}`, life: 3000});
        });  
      }
      
      useEffect(()=>{
        async function getData2(){
            await axios.get(`https://localhost:7084/api/Admin/GetAllDepts/`,config).then((result)=>{
                setRows(result.data);
            });
        }
        getData2();
        setPageRole(sessionStorage.getItem("role"));
      },[]);

      const confirm2 = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };
    const accept = async () => {
       await axios.delete(`https://localhost:7084/api/Admin/DeleteDept/${selectedProduct5.id}`,config).then(response=>{
            toast.current.show({severity:'success', summary: 'Success Message', detail:'Department and all related records with department deleted.', life: 3000});
        }).catch(error =>{
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error:${error}`, life: 3000 });
        });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Operation canceled', life: 3000 });
    };

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

    const saveUpdate = () =>{
        if(value1 == ''){
            toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You should make some changes before save', life: 3000 });
            window.location.reload();
        }
    }
    const docDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDocDialog(false);
            setValue1("");}} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUpdate}/>
        </React.Fragment>
    );

    return(
        <>
        { pageRole=="admin" ? 
        <div className='Page'>
        <ConfirmDialog />
        <Helmet>
        <title>Thesis Tracker | Departments</title>
        </Helmet>
        <Toast ref={toast} />
<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
  <Card style={{marginTop:'2rem', paddingBottom:'2rem', width:'80%'}} className='card2'>
    <div className="table" style={{width:'100%',height:'-webkit-fill-available'}}>
        <h3>Departments</h3>
                        <DataTable value={rows} paginator responsiveLayout="scroll" selection={selectedProduct5} onSelectionChange={e => setSelectedProduct5(e.value)}
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,20]}>
                        <Column selectionMode="single" headerStyle={{width: '3%'}}></Column>
                        <Column field="id" header="ID" style={{ width: '20%' }}></Column>
                        <Column field="name" header="Department" style={{ width: '60%' }}></Column>
                        <Column header="Edit" body={actionEdit}></Column>
                        </DataTable>
                    </div>
                    <div className="buttonArea" style={{marginTop:'0rem'}}>
                    <Button disabled={selectedProduct5 ? false: true} label="Delete" className="p-button-raised p-button-danger" onClick={confirm2} style={{marginTop:'3rem',marginBottom:'1rem'}} icon="pi pi-trash"></Button>
                    </div>
                    </Card>
  <Card className="card" style={{marginTop:'2rem',width:'40%'}}>
    <h3>Add New Department</h3>
        <div className='area' style={{marginTop:'0rem'}}>
            <TextField
                id="outlined-multiline-static"
                label="Name"
                multiline
                rows={4}
                value={dept}
                onChange={(e)=>{setDept(e.target.value)}}
        />
        </div>
    <div>
         <Button style={{marginTop:'2rem'}} onClick={handleChange2} disabled={dept ? false: true} className="p-button-raised p-button-success">Create</Button>
       </div>
      
      </Card>  
      <Dialog visible={docDialog} style={{ width: '450px' }} header="Document Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                       
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Name:
                        </label>
                        <InputTextarea value={value1} placeholder={doc ? doc.name: null} onChange={(e) => setValue1(e.target.value)} />
                    </div>
                </Dialog>
    
  </div>
  
</div>

</div> : <Unauthorized></Unauthorized>}

      </>
    )
}