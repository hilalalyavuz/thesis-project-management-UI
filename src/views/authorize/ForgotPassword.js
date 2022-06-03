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
import singin from '../../img/forgotpass.svg';
import logo from '../../img/logo.png';
import wave from '../../img/wave.svg';
import axios from 'axios';
import { createBrowserHistory } from 'history';




export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const toast = useRef(null);
    
    const send = async () =>{

        await axios.post(`https://localhost:7084/api/User/forgotPassword`,{
            "email":email,
            "code":code,
            "password":password
        }).then(response => {

            toast.current.show({severity:'success', detail:'Password changed', life: 3000});
            createBrowserHistory().push('/SignIn');
                window.location.reload();
              
            }).catch(error => {

          });;

    }

    const getCode = async () =>{

        await axios.get(`https://localhost:7084/api/User/recovery/${email}`).then(response => {

            toast.current.show({severity:'warn', detail:'Check your email for recovery code', life: 3000});
              
            }).catch(error => {

          });;  

    }


    return(
        <>
        <div className='Page'>
        <Toast ref={toast} />


<div className='Main'>

<div style={{display:'flex'}}>
<img style={{width:'13%'}} src={logo}/>
 <div style={{display:'flex',width:'100%',justifyContent:'center', alignItems:'center'}}>
 <h1>Thesis Tracker</h1>
 </div>
 <img style={{width:'13%',visibility:'hidden'}} src={logo}/>
</div>

  <div className='Main2' style={{height:'55%'}}>



      <div style={{display:'flex',flexDirection:'row',height:'100%'}}>
            <Card style={{display:'flex',flex:'1',marginRight:'2rem', boxShadow:'rgb(204 204 204) 0rem 0rem 2rem 7px'}}>
                <div style={{display:'flex', flex:'1',justifyContent:'center', alignItems:'center'}}>
                    <img style={{width:'80%', height:'80%'}} src={singin}/>
                </div>
               
            </Card>
            <Card style={{display:'flex',flex:'1', boxShadow:'rgb(204 204 204) 0rem 0rem 2rem 7px'}}>
                <div style={{display:'flex',flex:'1', justifyContent:'center'}}>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <h2 style={{display:'flex',justifyContent:'center'}}>Forgot Password</h2>
                                <TextField id="email" label="Email" autoComplete="email" type="email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <Button style={{marginTop:'1rem',height:'2rem',borderRadius:'1rem',border:'1px solid #50C878', backgroundColor:'#50C878', color:'white', cursor:'pointer'}} onClick={getCode} >Get recovery code</Button>
                            <TextField
            id="outlined-password-input"
            label="Code"
            type="password"
            autoComplete="current-password"
            value={code} onChange={(e)=> setCode(e.target.value)}
            />
                            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password} onChange={(e)=> setPassword(e.target.value)}
            />
                <Button style={{marginTop:'1rem',height:'2rem',borderRadius:'1rem',border:'1px solid #50C878', backgroundColor:'#50C878', color:'white', cursor:'pointer'}} onClick={send}>Save</Button>
            
            
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