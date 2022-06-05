import * as React from 'react';
import {useState, useEffect,useRef} from 'react';
import Sidebar from '../../components/Admin_Sidebar';
import '../../css/Common.css'
import { Card } from '@mui/material';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { TabMenu } from 'primereact/tabmenu';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Unauthorized from '../Warnings/Unauthorized';


export default function UserAdmin() {


    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [date8, setDate8] = useState(null);
    const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
    const [date3, setDate3] = useState(null);
    const [value1, setValue1] = useState('');
    const [stat,setStat2] = useState(null);
    const [rows,setRows] = useState([]);
    const toast = useRef(null);
    const [tab, setTab] = useState(true);
    const [users, setUsers] = useState([]);
    const [newUsers, setNewUsers] = useState([]);
    const [active,setActive] = useState();
    const [capReq,setCapReq] = useState(false);

    const status = [{name: 'student'},{name: 'supervisor'}]
    const [capacity, setCapacity] = useState();
    const [disp, setDisp] = useState('normal');
    const [isSup ,setSup] = useState();
    const items = [
        {label: 'Users', icon: 'pi pi-users'},
        {label: 'New Users', icon: 'pi pi-user-plus'}
    ];

    let tok = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `bearer ${tok}` }
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
        if(tab){
            if(doc.role_id=='supervisor'){
                setCapacity(doc.capacity);
                setSup(true);
            }else{
                setCapacity(null);
                setSup(false);
            }
        }else{
            setSup(false);
        }
    }

    const setStat = (event) => {
        setStat2(event.target.value);
        
        if(event.target.value.name == 'supervisor'){
            setSup(true);
            if(!tab){
                setCapReq(true);
            }else{
                setCapReq(false);
            }
            
        }else{
            setSup(false);
            setCapReq(false);
        }
        
    }

    const saveEdit = () =>{
        if(stat != null || stat != ""){
                axios.patch(`https://localhost:7084/api/Admin/ChangeRole/${doc.id}`,
              {
                  "name":doc.name,
                  "surname":doc.surname,
                  "email":doc.email,
                  "department":doc.department,
                  "password":doc.password,
                  "school_id":doc.school_id,
                  "role_id":stat.name
                },config).then(response => {
                    toast.current.show({severity:'success', summary: 'User Role Changed', life: 3000});
                    window.location.reload();
                }).catch(error => {
                    toast.current.show({severity:'error', summary: `Error: ${error}`, life: 3000});
              }); 
            
              setDocDialog(false); 
        }
    }

    const docDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDocDialog(false);setStat2(null);}} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveEdit}/>
        </React.Fragment>
    );

    useEffect(() =>{
        async function getData(){
            await axios.get(`https://localhost:7084/api/Admin/GetUsers/`,config).then((result)=>{
                setUsers(result.data);
            });
        }
        getData();
        async function getData2(){
            await axios.get(`https://localhost:7084/api/Admin/GetNewUsers/`,config).then((result)=>{
                setNewUsers(result.data);
            });
        }
        getData2();
        setPageRole(sessionStorage.getItem("role"));
    },[]);

    return(
        <>
        { pageRole=="admin" ? 
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Users</title>
</Helmet>
        <Toast ref={toast} />

<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
  
  <Card style={{marginTop:'5rem', paddingBottom:'2rem', width:'80%'}} className='card2'>
    <div className="table" style={{width:'100%',height:'-webkit-fill-available'}}>
    <TabMenu model={items} onTabChange={(e)=>{ if(e.value.label =="New Users"){
        setTab(false);
    }else{
        setTab(true);
    }setActive(e.index)}} activeIndex={active} />
                        <DataTable value={tab ? users: newUsers} paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,20]}>
                        <Column field="name" header="Name" style={{ width: '15%' }}></Column>
                        <Column field="surname" header="Surname" style={{ width: '15%' }}></Column>
                        <Column field="email" header="Email" style={{ width: '20%' }}></Column>
                        <Column field="school_id" header="School Id" style={{ width: '15%' }}></Column>
                        <Column field="department" header="Department" style={{ width: '15%' }}></Column>
                        <Column field="role_id" header="Role" style={{ width: '15%' }}></Column>
                        <Column header="Edit" body={actionEdit}></Column>
                        </DataTable>
                    </div>
                    </Card>
                   <Dialog visible={docDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Role:
                        </label>
                            <Dropdown value={stat} options={status} onChange={setStat} optionLabel="name" placeholder="Select Role" />
                        </div>
                        {isSup ?
                            <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                            <label style={{marginRight:'1rem'}}>
                                 Capacity:
                            </label>
                            <InputText visible={isSup} onChange={(e) => setCapacity(e.target.value)} placeholder={capacity} />
                        </div> : <div></div>
                        }
                </Dialog>
    
  </div>

</div>
 
</div> : <Unauthorized></Unauthorized>}
      </>
    )
}