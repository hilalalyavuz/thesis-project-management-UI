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
import axios from 'axios';
import { createBrowserHistory } from 'history';




export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useRef(null);
    const [token,setToken] = useState();
    const [role,setRole] = useState("role");
    
    const send = () =>{

        if(!email.includes('@')){
            toast.current.show({severity:'warn', detail:"Please enter a part following '@'.", life: 3000});
        }else{
        
        const GetData = async () => { 
            await axios.post('https://localhost:7084/Auth/login',
            {
                "email": email,
                "password": password
              }).then(response => {
                toast.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
                setToken(response.data[0]);
                sessionStorage.setItem("token", response.data[0]);
                setRole(response.data[1]);
                sessionStorage.setItem("role", response.data[1]);
                sessionStorage.setItem("email",email);
                const config = { headers: { Authorization: `bearer ${response.data[0]}` }}
                async function hasGroup(){
                    await axios.get(`https://localhost:7084/api/Student/hasGroup/${email}`,config).then((result)=>{
                        console.log("a",result.data);
                        if(result.data == false){
                          sessionStorage.setItem("created",true);
                        }else{
                            sessionStorage.setItem("created",false);
                        }
                    })
                    
                }
                  hasGroup();

                  async function hasSupervisor(){
                    await axios.get(`https://localhost:7084/api/Student/hasSupervisor/${email}`,config).then((result)=>{
                            console.log("b",result.data);
                            if(result.data == false){
                                sessionStorage.setItem("choosed",true);
                            }else{
                                sessionStorage.setItem("choosed",false);
                            }
                    })
                }
                  hasSupervisor();
                
                if(response.data[1] == "student"){
                    createBrowserHistory().push('/Home');
                    window.location.reload();
                }else if(response.data[1] == "supervisor"){
                    createBrowserHistory().push('/SupervisorHome');
                    window.location.reload();
                }else if(response.data[1] == "admin"){
                    createBrowserHistory().push('/DocumentsAdmin');
                    window.location.reload();
                }
                
            }).catch(error => {
                toast.current.show({severity:'error', summary: 'Failed to login', life: 3000});
            });;  
            
            };
            GetData();
        }

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

  <div className='Main2' style={{height:'50%'}}>



      <div style={{display:'flex',flexDirection:'row',height:'100%'}}>
            <Card style={{display:'flex',flex:'1',marginRight:'2rem', boxShadow:'rgb(204 204 204) 0rem 0rem 2rem 7px'}}>
                <div style={{display:'flex', flex:'1',justifyContent:'center', alignItems:'center'}}>
                    <img style={{width:'80%', height:'80%'}} src={singin}/>
                </div>
               
            </Card>
            <Card style={{display:'flex',flex:'1', boxShadow:'rgb(204 204 204) 0rem 0rem 2rem 7px'}}>
                <div style={{display:'flex',flex:'1', justifyContent:'center'}}>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <h2 style={{display:'flex',justifyContent:'center'}}>Welcome</h2>
                            <TextField id="email" label="Email" autoComplete="email" type="email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password} onChange={(e)=> setPassword(e.target.value)}
            />
            <div style={{marginTop:'1rem'}}>
            Don't have an account? <a href='/Register'>Sign up</a>
            </div>
            <div style={{marginTop:'1rem'}}>
            Don't remember your password? <a href='/ForgotPassword'>Forgot Password</a>
            </div>
                <Button style={{marginTop:'1rem',height:'2rem',borderRadius:'1rem',border:'1px solid #50C878', backgroundColor:'#50C878', color:'white', cursor:'pointer'}} onClick={send}>Sign In</Button>
            
            
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