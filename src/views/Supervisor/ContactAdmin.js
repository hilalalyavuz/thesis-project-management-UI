import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import '../../css/ContactSupervisor.css'
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import TextareaAutosize from '@mui/material/TextareaAutosize'; 
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Unauthorized from '../Warnings/Unauthorized';

export default function ContactAdmin() {

  
  let userEmail = sessionStorage.getItem("email");
  const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
  let tok = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };
    const [state2, setState2] = useState([]);
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");
    const toast = useRef(null);

      const handleChange2 = () => {
          axios.post(`https://localhost:7084/api/Supervisor/ContactAdmin/${userEmail}`,{topic:topic,message:message,status_id:"new"},config).then(response => {
            toast.current.show({severity:'success', summary: 'Success Message', detail:'Your message sent succesfully', life: 3000});
          }).catch(error => {
            toast.current.show({severity:'error', summary: `Error: ${error}`, life: 3000});
        });  
      }



    return(
        <>
        { pageRole=="supervisor" ? 
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Contact Admin</title>
        </Helmet>
        <Toast ref={toast} />
<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
    

  <Card className="card" style={{width:'60%'}}>
    <h3>Contact Admin</h3>
    <form onSubmit={handleChange2} style={{display:'flex', flexDirection:'column'}}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div className='area'>
            <label>
                Topic:
            </label>
            <TextField className='textf'
                required
                id="outlined-required"
                label="Topic"
                value={topic}
                onChange={(e)=>{setTopic(e.target.value)}}
            />
        </div>
        <div className='area'>
            <label>
                Message:
            </label>
            <TextField
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}
        />
        </div>
      
    </Box>

       
    <div style={{display:'flex',justifyContent:'center',marginBottom:'1rem'}}>
         <Button style={{width:'40%'}} type="submit" value="Submit" variant="contained">Submit</Button>
       </div>
</form>
            
        
          
        
      </Card>  
    
  </div>
  
    


</div>

</div> : <Unauthorized></Unauthorized>}

        





      </>
    )
}