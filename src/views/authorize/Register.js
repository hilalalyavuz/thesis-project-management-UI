import * as React from 'react';
import {useState, useRef, useEffect} from 'react'
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
import singin from '../../img/signin.svg';
import logo from '../../img/logo.png';
import wave from '../../img/wave.svg';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { Helmet } from 'react-helmet';
import { Dropdown } from 'primereact/dropdown';


export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [schoolid, setSchoolid] = useState('');
    const [dept, setDept] = useState([]);
    const toast = useRef(null);
    const [drops, setDrops] = useState([]);
    const [selectedDept, setSelectedDept] = useState();

    useEffect(() =>{
        async function getData2(){
            await axios.get(`https://localhost:7084/api/Admin/GetDepts/`).then((result)=>{
                setDrops(result.data);
            });
        }
        getData2();
    },[])
    
    const send = () =>{

        if(!email.includes('@')){
            toast.current.show({severity:'warn', detail:"Please enter a part following '@'.", life: 3000});
        }else{
        
        const GetData = async () => { 
            await axios.post('https://localhost:7084/api/User',
            {
                "name": name,
                "surname": surname,
                "email": email,
                "school_id": schoolid,
                "role_id": "",
                "password": password,
                "department":dept
              }).then(response => {
                  if(response.data == true){
                      toast.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
                createBrowserHistory().push('/SignIn');
                window.location.reload();
                  }else{
                    toast.current.show({severity:'error', summary: 'Failed to register', life: 3000});
                  }
                
                

              }).catch(error => {
                toast.current.show({severity:'error', summary: 'Failed to register', life: 3000});
            });;  
            
            };
            GetData();
        }

    }


    return(
        <>
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Register</title>
</Helmet>
        <Toast ref={toast} />


<div className='Main'>

<div style={{display:'flex'}}>
<img style={{width:'13%',height:'11rem'}} src={logo}/>
 <div style={{display:'flex',flexDirection:'column',width:'100%',justifyContent:'center', alignItems:'center'}}>
 <h1>Thesis Tracker</h1>
 <h2>Register</h2>
 </div>
 <img style={{width:'13%',height:'11rem',visibility:'hidden'}} src={logo}/>
</div>

  <div className='Main2' style={{height:'65%'}}>

      <div style={{display:'flex',flexDirection:'row',height:'100%'}}>
            <Card style={{display:'flex',flex:'1',marginRight:'2rem', boxShadow:'rgb(204 204 204) 0rem 0rem 2rem 7px'}}>
                <div style={{display:'flex', flex:'1',justifyContent:'center', alignItems:'center'}}>
                    <img style={{width:'80%', height:'80%'}} src={singin}/>
                </div>
               
            </Card>
            <Card style={{display:'flex',flex:'1', boxShadow:'rgb(204 204 204) 0rem 0rem 2rem 7px'}}>
                <div style={{display:'flex',flex:'1', justifyContent:'center'}}>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>
                            <TextField id="surname" label="Surname" variant="outlined" value={surname} onChange={(e)=>setSurname(e.target.value)}/>
                            <TextField id="email" label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <TextField id="schoolid" label="School Id" variant="outlined" value={schoolid} onChange={(e)=>setSchoolid(e.target.value)}/>
                            <Dropdown value={selectedDept} options={drops} onChange={(e)=>{setDept(e.value);setSelectedDept(e.value)}} placeholder="Select Department" style={{marginTop:'2rem'}} />
                            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password} onChange={(e)=> setPassword(e.target.value)}
            />
            
                <Button style={{marginTop:'2rem',height:'2rem',borderRadius:'1rem',border:'1px solid #50C878', backgroundColor:'#50C878', color:'white', cursor:'pointer'}} onClick={send}>Register</Button>
            
            
                        </div>
                    </div>
            </Card>
      </div>
    

   
  </div>
  

  <img style={{height:'20%',width:'100%',position:'absolute',bottom:'0',objectFit:'cover'}} src={wave}/>


</div>
</div>
      </>
    )
}