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
import singin from '../../img/signin.svg';
import logo from '../../img/logo.png';
import wave from '../../img/wave.svg';




export default function SignIn() {
    
    return(
        <>
        <div className='Page'>


<div className='Main'>

<div style={{display:'flex'}}>
<img style={{width:'13%'}} src={logo}/>
 <div style={{display:'flex',width:'100%',justifyContent:'center', alignItems:'center'}}>
 <h1>Thesis Project Management</h1>
 </div>
 <img style={{width:'13%',visibility:'hidden'}} src={logo}/>
</div>

  <div className='Main2' style={{height:'50%'}}>



      <div style={{display:'flex',flexDirection:'row',height:'100%'}}>
            <Card style={{display:'flex',flex:'1',marginRight:'2rem', boxShadow:'rgb(204 204 204) 0rem 0rem 2rem 7px'}}>
                <div style={{display:'flex', flex:'1',justifyContent:'center', alignItems:'center'}}>
                    <img style={{width:'80%', height:'80%'}} src={singin}/>
                </div>
               
            </Card>
            <Card style={{display:'flex',flex:'1', boxShadow:'rgb(204 204 204) 0rem 0rem 2rem 7px'}}>
                <div style={{display:'flex',flex:'1', justifyContent:'center'}}>
                        <form style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <h2 style={{display:'flex',justifyContent:'center'}}>Welcome</h2>
                            <TextField id="outlined-basic" label="Id" variant="outlined" />
                            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            />
            
                <input style={{marginTop:'2rem',height:'2rem',borderRadius:'1rem',border:'1px solid green', backgroundColor:'green', color:'white', cursor:'pointer'}} type="submit" class="btn" value="GİRİŞ"/>
            
            
                        </form>
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