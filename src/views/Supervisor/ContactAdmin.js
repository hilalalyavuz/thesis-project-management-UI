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

export default function ContactAdmin() {

  
    const [state2, setState2] = useState([]);
    

      const handleChange2 = (event) => {
          console.log(state2)
        alert('Gönderilen değer: ' + state2);
        event.preventDefault();
      }



    return(
        <>
        <div className='Page'>

<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
    

  <Card className="card">
    <h3>Contact Admin</h3>
    <form onSubmit={handleChange2} style={{display:'flex', flexDirection:'column'}}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
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
        />
        </div>
      
    </Box>

       
      <Button type="submit" value="Submit" variant="contained">Submit</Button>
</form>
            
        
          
        
      </Card>  
    
  </div>
  
    


</div>

</div>

        





      </>
    )
}