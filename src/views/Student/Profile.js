import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
import Sidebar from '../../components/Sidebar';
import '../../css/Common.css'
import '../../css/Profile.css'
import '../../css/Table.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import Button2 from '@mui/material/Button';
import { Button } from 'primereact/button';
import { DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

export default function Profile() {

    const toast = useRef(null);
    const [selectionModel, setSelectionModel] = useState([]);
    const [selectionModel1, setSelectionModel1] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [pass, setPass] = useState("");
    const [pemail, setPemail] = useState("");
    const [pschoolid, setPschoolid] = useState("");
    const [rows2, setRows2] = useState([]);
    const [rows3, setRows3] = useState([]);
    const [rows, setRows] = useState([]);
    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [docRowTopic, setDocRowTopic] = useState("");
    const [docRowMessage, setDocRowMessage] = useState("");
    const [value,setValue] = useState(0);
    const [response1,setResponse] = useState();
    const [disp,setDisp] = useState();
    

    let userEmail = sessionStorage.getItem("email");
    let role = sessionStorage.getItem("role");
    let tok = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `bearer ${tok}` }
    };

    const getProfile = async () => {
      await axios.get(`https://localhost:7084/api/Student/StudentProfile/${userEmail}`,config).then(response => {
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
      await axios.get(`https://localhost:7084/api/Student/StudentProfileMessageSent/${userEmail}`,config).then(response => {
                  response.data.map(function(x){
                    return setRows2(prevRow => ([...prevRow,{id:x.id, topic:x.topic, message:x.message, status:x.status_id,to_user_name:x.to_user_name}]))
                  }
                    )
              }).catch(error => {
  
            });  
    }

    const getMessages2 = async () => {
      await axios.get(`https://localhost:7084/api/Student/StudentProfileMessageReceived/${userEmail}`,config).then(response => {
                  response.data.map(function(x){
                    return setRows3(prevRow => ([...prevRow,{id:x.id, topic:x.topic, message:x.message, status:x.status_id, from_user_name:x.from_user_name}]))
                  }
                    )
              }).catch(error => {
  
            });  
    }

    const getMeetings = async () => {
      await axios.get(`https://localhost:7084/api/Student/StudentProfileMeeting/${userEmail}`,config).then(response => {
                  response.data.map(function(x){
                    return setRows(prevRow => ([...prevRow,{id:x.id, link:x.link, date:x.date}]))
                  }
                    )
              }).catch(error => {
  
            });;  
    }

    useEffect(() => { 
      
      getProfile();
      getMessages();
      getMessages2();
      getMeetings();  

    }, []);

    const deleteMeeting = async () => {
      await axios.delete(`https://localhost:7084/api/Student/StudentProfileMeetingDelete/${selectionModel[0]}`,config).then(response => {
                
              }).catch(error => {
                
            });;  
    }

    const updatePassword = async () => {
      if(pass.length>0){
      await axios.post(`https://localhost:7084/api/Student/StudentProfilePassword/${userEmail}`,{
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

const editDoc =  async() =>{
  if(value){
    var b = rows2.find(x => x.id === selectionModel1[0]);
    setDoc(b);
  }else{
    var a = rows3.find(x => x.id === selectionModel1[0]);
    await axios.get(`https://localhost:7084/api/Supervisor/ChangeStatusOfMessage/${selectionModel1[0]}`,config).then(result =>{
    });
    setDoc(a);
  }

  setDocDialog(true);
}

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const sendResponse = () =>{
  axios.post(`https://localhost:7084/api/Supervisor/AddResponse/${selectionModel1[0]}`,{response:response1, topic:doc.topic,
  message:doc.message, status_id:"new"},config).then(response => {
    toast.current.show({severity:'success', summary: 'Success Message', detail:'Your message sent succesfully', life: 3000});
  }).catch(error => {
    toast.current.show({severity:'error', summary: `Error: ${error}`, life: 3000});
});  
setDocDialog(false);
setValue(1);
window.location.reload();
}

const docDialogFooter = (
  <Fragment> 
    
      <Button disabled={doc ? false:true} label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDocDialog(false)}} />
      <Button disabled={doc&value ? false:true} visible={doc ? true: false} label="Send" icon="pi pi-send" className="p-button-text" onClick={sendResponse}/>
  </Fragment>   
  
);

    const columns = [

        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'link', headerName: 'Link', width: 700 },
        { field: 'date', headerName: 'Date', width: 200 },
      ];

      const columns3 = [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'from_user_name', headerName: 'From', width: 100 },
        { field: 'topic', headerName: 'Topic', width: 200 },
        { field: 'message', headerName: 'Message', width: 400 },
        { field: 'status', headerName: 'Status', width: 130 },
      ];

      const columns2 = [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'to_user_name', headerName: 'To', width: 100 },
        { field: 'topic', headerName: 'Topic', width: 200 },
        { field: 'message', headerName: 'Message', width: 400 },
        { field: 'status', headerName: 'Status', width: 130 },
      ];


    return(

        <>

<div className='Page'>
<Helmet>
        <title>Thesis Tracker | Profile</title>
      </Helmet>
<Toast ref={toast} />
<div className='Sidebar'>
    <Sidebar dname='Profile'/>
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
                    <Button2 className='submit' onClick={updatePassword} variant="contained">Update</Button2>
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

                            <Button2 variant="outlined" onClick={deleteMeeting} startIcon={<DeleteIcon />}>
                              Delete
                            </Button2>

                          </div>
            </Card>

            <Card className='card2'>
            <div className='tableProfile'>
            <h3>Messages</h3>
            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={(e,n)=>{handleChange(e,n);
          if(value){
            setDisp("");
          }else{
            setDisp("none");
          }}}>
          <Tab label="Received"  />
          <Tab label="Sent"  />
        </Tabs>
      </Box>
    </Box>
                
                              <DataGrid
                                              rows={value ? rows2: rows3}
                                              columns={value ? columns2: columns3}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              selectionModel={selectionModel1}
                                              hideFooterSelectedRowCount
                                              onSelectionModelChange={onRowSelect1}
                                              
                                          />
                          </div>

                          <div className='tableButtons' style={{marginTop:'6rem'}}>

                          <Button2 variant="contained" onClick={editDoc} startIcon={<VisibilityIcon />}>
                              View
                            </Button2>
                          </div>
                
            </Card>
            <Dialog visible={docDialog} style={{ width: '450px' }} header="Message Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                <div className="field">
                    <label htmlFor="name">{doc ? doc.name:null}</label>
                </div>
                <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Topic:
                        </label>
                            {doc? doc.topic: null}
                            </div>

                            <div style={{marginTop:'1rem'}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem'}}>
                             Message:
                        </label>
                        {doc? doc.message: null}
                        </div>
                      <div style={{marginTop:'1rem',display:disp}} className="field col-12 md:col-4">
                        <label style={{marginRight:'1rem',marginBottom:'1rem'}}>
                             Response:
                        </label>
                        <TextField sx={{marginTop:'0rem'}}
                multiline
                rows={5}
                fullWidth
                value={response1}
                onChange={(e)=>{setResponse(e.target.value)}}
                style={{marginTop:'0.5rem'}}
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