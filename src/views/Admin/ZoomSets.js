import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Admin_Sidebar';
import '../../css/Common.css'
import '../../css/ContactSupervisor.css'
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import { Button } from 'primereact/button';
import Box from '@mui/material/Box';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import TextareaAutosize from '@mui/material/TextareaAutosize'; 
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function ZoomSets() {

  
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };
    const [state2, setState2] = useState([]);
    const [ztoken, setZToken] = useState("");
    const toast = useRef(null);

      const handleChange2 = () => {
          axios.put(`https://localhost:7084/api/Admin/UpdateZoomToken/`,{id:1,token:ztoken},config).then(response => {
            toast.current.show({severity:'success', summary: 'Success Message', detail:'Zoom token changed succesfully', life: 3000});
            window.location.reload();
          }).catch(error => {
            toast.current.show({severity:'error', summary: `Error: ${error}`, life: 3000});
        });  
      }



    return(
        <>
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Zoom Settings</title>
        </Helmet>
        <Toast ref={toast} />
<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
    

  <Card className="card" style={{width:'50%'}}>
    <h3>Zoom Settings</h3>
        <div className='area' style={{marginTop:'0rem'}}>
            <TextField
                id="outlined-multiline-static"
                label="Token"
                multiline
                rows={4}
                value={ztoken}
                onChange={(e)=>{setZToken(e.target.value)}}
        />
        </div>

       
    <div>
         <Button style={{marginTop:'2rem'}} onClick={handleChange2} disabled={ztoken? false: true} className="p-button-raised p-button-success">Save</Button>
       </div>
      </Card>  
    
  </div>
  
</div>

</div>

      </>
    )
}