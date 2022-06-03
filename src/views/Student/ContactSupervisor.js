import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Sidebar';
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

export default function ContactSupervisor() {

  const [topic, setTopic] = useState([]);
  const [message, setMessage] = useState([]);
  const toast = useRef(null);
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");
  const config = {
      headers: { Authorization: `bearer ${tok}` }
  };
  let choosed = sessionStorage.getItem("choosed");
    

    const [state2, setState2] = useState([]);

    const send = async () => {
      await axios.post(`https://localhost:7084/api/Student/Message/${userEmail}`,
            {
                "topic": topic,
                "message": message,
                "status_id":"new"
              },config).then(response => {
                toast.current.show({severity:'success', summary: 'Success Message', detail:'Your message sent succesfully', life: 3000});
                window.location.reload();
              }).catch(error => {
                toast.current.show({severity:'error', summary: `Error: ${error}`, life: 3000});
            });;  
    }
    

      const handleChange2 = (event) => {
          console.log(state2)
        alert('Gönderilen değer: ' + state2);
        event.preventDefault();
      }



    return(
        <>
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Contact Supervisor</title>
      </Helmet>
        <Toast ref={toast} />

<div className='Sidebar'>
    <Sidebar dname='ContactSupervisor'/>
</div>

<div className='Main'>
  <div className='Main2'>
    

  <Card className="card" style={{width:'60%'}}>
    <h3>Contact Supervisor</h3>
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
                defaultValue="Hello World"
                value={topic} onChange={(e)=>setTopic(e.target.value)}
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
                defaultValue="Default Value"
                value={message} onChange={(e)=>setMessage(e.target.value)}
        />
        </div>
      
    </Box>

       <div style={{display:'flex',justifyContent:'center',marginBottom:'1rem'}}>
         <Button disabled={choosed ? false : true} style={{width:'40%'}} onClick={send} value="Submit" variant="contained">Submit</Button>
       </div>
      
</form>
            
        
          
        
      </Card>  
    
  </div>
  
    


</div>

</div>

        





      </>
    )
}