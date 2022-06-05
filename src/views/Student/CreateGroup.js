import * as React from 'react';
import {useState, useRef, useEffect} from 'react'
import Sidebar from '../../components/Sidebar';
import '../../css/Common.css'
import '../../css/CreateGroup.css'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css"; 
import { Checkbox } from 'primereact/checkbox';    
import axios from 'axios';  
import { createBrowserHistory } from 'history';  
import { Helmet } from 'react-helmet';           
import Unauthorized from '../Warnings/Unauthorized';

export default function CreateGroup() {

    const toast = useRef(null);
    const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
    const [size, setSize] = useState();
    const [checked, setChecked] = useState(false);
    let userEmail = sessionStorage.getItem("email");
    let tok = sessionStorage.getItem("token");
    let created = sessionStorage.getItem("created");
    const [state2, setState2] = useState([]);
    const [flag,setFlag] = useState();


     const config = {
        headers: { Authorization: `bearer ${tok}` }
    };

    const [id,setId] = useState("");
    const handleChange3 = (event) => {
        state2[(event.target.name)-1] = event.target.value;
      }
    
        const handleChange = (event) => {
        setSize(event.target.value);
        toast.current.show({ severity: 'info', summary: 'Group Size Selected', detail: `size: ${event.target.value}`, life: 3000 });
      }

      const handleChange2 = (event) => {
          console.log(state2)
        alert('Gönderilen değer: ' + state2);
        event.preventDefault();
      }
    

      const runCallback = (cb) => {
        return cb();
      };

      const submitValues = () =>{
          if(checked){
            axios.post(`https://localhost:7084/api/Student/Group`,{'size':1,'ids':[id]},config).then((result)=>{
            toast.current.show({severity:'success', detail:"Submitted", life: 3000});
            sessionStorage.setItem("created",true);
            createBrowserHistory().push('/CreateGroup');
            window.location.reload();

          });

          }else{
            state2.push(id);
            axios.post(`https://localhost:7084/api/Student/Group`,{'size':size+1,'ids':state2},config).then((result)=>{
            toast.current.show({severity:'success', detail:"Submitted", life: 3000});
            console.log(result.data);
            sessionStorage.setItem("created",true);
            createBrowserHistory().push('/CreateGroup');
            window.location.reload();

          }).catch(error =>{

        });
        }
      }

      useEffect(()=>{
        async function getData(){
            await axios.get(`https://localhost:7084/api/Student/schoolId/${userEmail}`,config).then((result)=>{
                setId(result.data.toString());
            })
        }
        getData();
        if(sessionStorage.getItem("created")=="true"){
          setFlag(true);
        }else{
          setFlag(false);
        }
        setPageRole(sessionStorage.getItem("role"));
    },[]);



    return(
        <>
        { pageRole=="student" ? 
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Create Group</title>
      </Helmet>
<div className='Sidebar'>
    <Sidebar dname='CreateGroup'/>
</div>

<div className='Main'>
  { flag ? <div><h5>You made your choice</h5></div> : 
  <div className='Main2'>
  <Toast ref={toast} />
  <Card className="card">
    <h3>Create Group</h3>
    <div className="field-checkbox" style={{margin:'0.5rem'}}>
      <Checkbox style={{marginRight:'0.5rem'}} inputId="binary" checked={checked} onChange={e => {setChecked(e.checked)}} />
        <label htmlFor="binary">I'll do it on my own.</label>
    </div>
    
    <div style={{display:'flex', flexDirection:'column'}}>
    <Box sx={{ minWidth: 240 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          disabled={checked}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
        </Select>
      </FormControl>
    </Box>

        {
        runCallback(() => {
          const row = [];
          for (var i = 1; i <= size; i++) {
            row.push(<TextField disabled={checked} id="outlined-basic" label={`${i}. School Id`} variant="outlined" name={i} key={i} inputProps={{ inputMode: 'numeric'}} onChange={handleChange3}/>);
          }
          return row;
        })
      }
      <Button type="submit" value="Submit" variant="contained" onClick={submitValues}>Submit</Button>
</div>
        
      </Card>  
    
  </div>
  }
</div>
    

</div> : <Unauthorized></Unauthorized>}
  
      </>
);
}
