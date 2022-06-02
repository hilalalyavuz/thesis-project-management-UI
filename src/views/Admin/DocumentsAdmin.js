import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
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
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Toast } from 'primereact/toast';
import { DesktopAccessDisabled } from '@mui/icons-material';
import { Helmet } from 'react-helmet';

export default function DocumentsAdmin() {


    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [date8, setDate8] = useState(null);
    const [date3, setDate3] = useState(null);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [date9, setDate9] = useState(null);
    const [date4, setDate4] = useState(null);
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [rows, setRows] = useState([]);
    const [drops, setDrops] = useState([]);
    const [selectedDept, setSelectedDept] = useState();
    var today = new Date();
    let userEmail = sessionStorage.getItem("email");
    let tok = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `bearer ${tok}` }
    };
    const toast = useRef(null);

    useEffect(() =>{
        async function getData(){
            await axios.get(`https://localhost:7084/api/Admin/GetDocumentTypes/`,config).then((result)=>{
                result.data.map(x =>{
                    let y = x.deadline.split('T')[1].substring(0,5);
                    let z = x.deadline.split('T')[0];
                    setRows(old => ([...old, {id:x.id, department:x.department,name:x.name, deadline:z, hour:y}]));
                });
            });
        }
        getData();
        async function getData2(){
            await axios.get(`https://localhost:7084/api/Admin/GetDepts/`,config).then((result)=>{
                setDrops(result.data);
            });
        }
        getData2();
    },[]);

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

    const createDoc = (e) =>{
        if(date4 != null && date9 != null && value3 !='' && value4 != ''){
            let month = date4.getMonth()+1;
        if(month < 10){
            month = "0"+month;
        }
        let minutes = date9.getMinutes();
        if(minutes < 10){
            minutes = "0"+minutes;
        }
        let date = date4.getDate();
        if(date < 10){
            date = "0" + date;
        }
        let hours = date9.getHours();
        if(hours < 10){
            hours = "0"+hours;
        }
        let dead = date4.getFullYear()+"-"+month+"-"+date+ "T" +hours+":"+minutes+":00";
        axios.post('https://localhost:7084/api/Admin/CreateDoc',{"name":value3,"department":value4,"deadline":dead},config).then(response=>{
            toast.current.show({severity:'success', summary: 'New Document Type Created', life: 3000});
        }).catch(error=>{
            toast.current.show({severity:'error', summary: `Error: ${error}`, life: 3000});
        });
        
        }else{
            e.preventDefault();
            toast.current.show({severity:'warn', summary: `You have to fill all fields in the form before submit!`, life: 3000});
        }
        
        
    }

    const saveUpdate = (e) =>{
        let dept;
        let dayss;
        let hourss;
        let names;
        let deads;
        if(value2 == null || value2 == ""){
            dept = doc.department;
        }else{
            dept = value2;
        }
        if(value1 == null || value1 == ""){
            names = doc.name;
        }else{
            names = value1;
        }
        if(date3 == null){
            dayss = doc.deadline;
        }else{
            let month = date3.getMonth()+1;
            if(month < 10){
                month = "0"+month;
            }
            let dt = date3.getDate();
            if(dt < 10){
                dt = "0" + dt;
            }
            dayss = date3.getFullYear()+"-"+month + "-" + dt;
        }
        if(date8 == null){
            hourss = doc.hour;
        }else{
            let hh = date8.getHours();
            if(hh < 10){
                hh = "0"+hh;
            }
            let min = date8.getMinutes();
            if(min < 10){
                min = "0" + min;
            }
            hourss = hh + ":"+min+":"+"00";
        }
        deads = dayss + "T" + hourss;
        console.log(doc.id);
        console.log(deads);
        console.log(names);
        console.log(dept);
        axios.patch(`https://localhost:7084/api/Admin/UpdateDoc/${doc.id}`,
              {
                  "id": doc.id,
                  "deadline":deads,
                  "name": names,
                  "department":dept
                },config).then(response => {
                    toast.current.show({severity:'success', summary: 'Document updated succesfully', life: 3000});
                    window.location.reload();
                }).catch(error => {
                    toast.current.show({severity:'error', summary: `Error: ${error}`, life: 3000});
              }); 
              setDocDialog(false); 
    }

    const docDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDocDialog(false);
            setValue1(""); setValue2(""); setDate3(""); setDate8("")}} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUpdate}/>
            <Button label="Delete" icon="pi pi-trash" className="p-button-text" onClick={()=>{console.log("deleted")}}/>
        </React.Fragment>
    );

    return(
        <>
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Document Types</title>
</Helmet>
        <Toast ref={toast} />
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
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,20]}>
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
                            <Calendar id="icon" value={date4} onChange={(e) => setDate4(e.value)} showIcon dateFormat='yy-mm-dd' minDate={today}/>
                        </div>
                        <div className="field col-12 md:col-4" style={{marginTop:'1rem'}}>
                        <label style={{marginRight:'1.3rem'}}>
                             Hour:
                        </label>
                        <Calendar id="time24" value={date9} onChange={(e) => setDate9(e.value)} showIcon icon={<QueryBuilderIcon/>} timeOnly hourFormat="24" />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Name:
                        </label>
                        <InputText value={value3} onChange={(e) => setValue3(e.target.value)} />
                    </div>
                    <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1.5rem'}}>
                             Dept:
                        </label>
                        <Dropdown value={selectedDept} options={drops} onChange={(e)=>{setValue4(e.value);setSelectedDept(e.value)}} placeholder="Select Department" />
                    </div>
                    
                        
                            </Box>
                        
                        <div style={{marginTop:'2rem',justifyContent:'center',display:'flex'}}>
                            <Button style={{backgroundColor:'#50C878', borderColor:'#50C878'}} onClick={createDoc}>Create</Button>
                        </div>
                        
                        </form>
          
          </div>
                    </Card>
                   <Dialog visible={docDialog} style={{ width: '450px' }} header="Document Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                <div className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Date:
                        </label>
                            <Calendar id="icon" value={date3} onChange={(e) => setDate3(e.value)} showIcon placeholder={doc ? doc.deadline:null} dateFormat='yy-mm-dd' minDate={today} />
                        </div>
                        <div className="field col-12 md:col-4" style={{marginTop:'1rem'}}>
                        <label style={{marginRight:'1.3rem'}}>
                             Hour:
                        </label>
                        <Calendar id="time24" value={date8} placeholder={doc ? doc.hour:null} onChange={(e) => setDate8(e.value)} showIcon icon={<QueryBuilderIcon/>} timeOnly hourFormat="24" />
                        </div>
                        <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Name:
                        </label>
                        <InputText value={value1} placeholder={doc ? doc.name: null} onChange={(e) => setValue1(e.target.value)} />
                    </div>
                    <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1.5rem'}}>
                             Dept:
                        </label>
                        <Dropdown value={selectedDept} options={drops} onChange={(e)=>{setValue2(e.value);setSelectedDept(e.value)}} placeholder="Select Department" />
                    </div>
                </Dialog>
    
  </div>

</div>

</div>
      </>
    )
}