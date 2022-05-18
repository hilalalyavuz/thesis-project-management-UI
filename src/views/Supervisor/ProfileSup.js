import Sup_Sidebar from '../../components/Sup_Sidebar';
import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
import '../../css/Common.css'
import '../../css/Profile.css'
import '../../css/Table.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

export default function ProfileSup() {

    const toast = useRef(null);
    const [selectionModel, setSelectionModel] = useState([]);
    const [selectionModel1, setSelectionModel1] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [pass, setPass] = useState("");
    const [pemail, setPemail] = useState("");
    const [pschoolid, setPschoolid] = useState("");
    const [rows2, setRows2] = useState([]);
    const [rows, setRows] = useState([]);
    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [docRowTopic, setDocRowTopic] = useState("");
    const [docRowMessage, setDocRowMessage] = useState("");

    

    let userEmail = sessionStorage.getItem("email");
    let role = sessionStorage.getItem("role");
    let tok = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `bearer ${tok}` }
    };

    useEffect(() => { 
      const getProfile = async () => {
        await axios.get(`https://localhost:7084/api/Supervisor/SupervisorProfile/${userEmail}`,config).then(response => {
                    response.data.map(x => 
                      { setName(x.name)
                        setSurname(x.surname)
                        setPemail(x.email)
                        setPschoolid(x.school_id)                   
                    }
                      )
                }).catch(error => {
    
              });;  
      }

      const getMessages = async () => {
        await axios.get(`https://localhost:7084/api/Supervisor/SupervisorProfileMessage/${userEmail}`,config).then(response => {
                    response.data.map(function(x){
                      return setRows2(prevRow => ([...prevRow,{id:x.id, topic:x.topic, message:x.message, status:x.status_id}]))
                    }
                      )
                }).catch(error => {
    
              });;  
      }

      const getMeetings = async () => {
        await axios.get(`https://localhost:7084/api/Supervisor/SupervisorProfileMeeting/${userEmail}`,config).then(response => {
                    response.data.map(function(x){
                      return setRows(prevRow => ([...prevRow,{id:x.id, link:x.link, date:x.date}]))
                    }
                      )
                }).catch(error => {
    
              });;  
      }
      getProfile();
      getMessages();
      getMeetings();  

    }, []);

    const deleteMeeting = async () => {
      await axios.delete(`https://localhost:7084/api/Supervisor/SupervisorProfileMeetingDelete/${selectionModel[0]}`,config).then(response => {
                
              }).catch(error => {
                
            });;  
    }

    const updatePassword = async () => {
      if(pass.length>0){
      await axios.post(`https://localhost:7084/api/Supervisor/SupervisorProfilePassword/${userEmail}`,{
        "name": name,
        "surname": surname,
        "email": userEmail,
        "school_id": pschoolid,
        "password": pass,
        "role_id": role
      },config).then(response => {
        toast.current.show({severity:'success', summary: 'Password Updated', life: 3000});
              }).catch(error => {
                toast.current.show({severity:'error', summary: 'Failed to update password', life: 3000});
            });;  
          }
    }


    const onRowSelect = (selModel)=>{
            if (selModel.length > 1) {
              const selectionSet = new Set(selectionModel);
              const result = selModel.filter((s) => !selectionSet.has(s));

              setSelectionModel(result);
            } else {
              setSelectionModel(selModel);
            }
            
          
    }

    const onRowSelect1 = (selModel)=>{
            
        if (selModel.length > 1) {
          const selectionSet = new Set(selectionModel1);
          const result = selModel.filter((s) => !selectionSet.has(s));

          setSelectionModel1(result);
        } else {
          setSelectionModel1(selModel);
        }
        
      
}

const editDoc = () =>{
  rows2.map(x => {if(x.id == selectionModel1){
    setDocRowTopic(x.topic)
    setDocRowMessage(x.message)
  }})
  setDocDialog(true);
}

const docDialogFooter = (
  <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDocDialog(false)}} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={()=>{console.log("saved")}}/>
  </React.Fragment>
);

    const columns = [

        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'link', headerName: 'Link', width: 700 },
        { field: 'date', headerName: 'Date', width: 200 },
      ];

      const columns2 = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'topic', headerName: 'Topic', width: 200 },
        { field: 'message', headerName: 'Message', width: 600 },
        { field: 'status', headerName: 'Status', width: 130 },
      ];


    return(

        <>

<div className='Page'>
<Toast ref={toast} />
<div className='Sidebar'>
    <Sup_Sidebar dname='Profile'/>
</div>

<div className='Main'>
  <div className='Main2'>
    
        <div style={{width:'70%'}}>
        <Card className="card2">
        <h3>Profile</h3>
            <form>
                <div className='formTop'>
                    <div className='formLeft'>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                            id="outlined-read-only-input"
                            label="Name"
                            value={name}
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField
                            id="outlined-read-only-input"
                            label="Surname"
                            value={surname}
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            value={pass} onChange={(e)=>setPass(e.target.value)}
                            autoComplete="current-password"
                            />
                        </Box>
                    </div>
                    <div className='formRight'>
                    <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                            id="outlined-read-only-input"
                            label="Email"
                            value={pemail}
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField
                            id="outlined-read-only-input"
                            label="School Id"
                            value={pschoolid}
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        </Box>
                    </div>
                </div>
                <div className='formBottom'>
                    <Button className='submit' onClick={updatePassword} variant="contained">Update</Button>
                </div>
            </form>
            </Card>

            <Card className='card2'>
                <div className='tableProfile'>
                <h3>Appointment</h3>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              selectionModel={selectionModel}
                                              hideFooterSelectedRowCount
                                              onSelectionModelChange={onRowSelect}
                                              
                                          />
                          </div>

                          <div className='tableButtons'>

                            <Button variant="outlined" onClick={deleteMeeting} startIcon={<DeleteIcon />}>
                              Delete
                            </Button>

                          </div>
            </Card>

            <Card className='card2'>
            <div className='tableProfile'>
                <h3>Messages</h3>
                              <DataGrid
                                              rows={rows2}
                                              columns={columns2}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              selectionModel={selectionModel1}
                                              hideFooterSelectedRowCount
                                              onSelectionModelChange={onRowSelect1}
                                              
                                          />
                          </div>

                          <div className='tableButtons'>

                          <Button variant="contained" onClick={editDoc} startIcon={<VisibilityIcon />}>
                              View
                            </Button>

                          </div>
                
            </Card>

            <Dialog visible={docDialog} style={{ width: '450px' }} header="Document Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                <div className="field">
                    <label htmlFor="name">{doc ? doc.name:null}</label>
                </div>
                <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Topic:
                        </label>
                            {docRowTopic}
                            </div>

                            <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Meesage:
                        </label>
                        <TextField sx={{marginTop:'0rem'}}
                id="read-only-multiline-static"
                multiline
                rows={4}
                defaultValue="Default Value"
                value={docRowMessage}
        />
                        </div>
                </Dialog>
        </div>

        



  </div>
  
    


</div>

</div>

        </>

    )


}