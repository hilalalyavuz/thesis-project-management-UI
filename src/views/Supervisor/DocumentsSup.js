import * as React from 'react';
import {useState, useRef, useEffect} from 'react'
import Sup_Sidebar from '../../components/Sup_Sidebar';
import SupTableDoc from '../../components/SupTableDoc';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Unauthorized from '../Warnings/Unauthorized';


export default function DocumentSup(){
    
    const[header, setHeader] = useState([]);
    const[group, setGroup] = useState([]);
    const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");
  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };

    useEffect(()=>{
        async function getData(){
            await axios.get(`https://localhost:7084/api/User/GetDocumentType/${userEmail}`,config).then((result)=>{
                result.data.sort(function(a,b) {
                    a = a.deadline.split('T')[0].split('-').reverse().join('');
                    b = b.deadline.split('T')[0].split('-').reverse().join('');
                    return a > b ? 1 : -1;
                  });
                setHeader(result.data);
            });
        }
        async function getGroup(){
            await axios.get(`https://localhost:7084/api/Supervisor/Group/${userEmail}`,config).then((result)=>{
                setGroup(result.data);
            });
        }
        getData();
        getGroup();
        setPageRole(sessionStorage.getItem("role"));
    },[]);



    
    const [selectedCity1, setSelectedCity1] = useState("");
    const [selectedCity2, setSelectedCity2] = useState("");
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }

    const FilterGroup = async () => {
        setSelectedCity2(selectedCity1)
        OpenGroupDocs();
    }
    const OpenGroupDocs = () => {
        return(
            <div className='' style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                {header.map(x => (
              <SupTableDoc data={{name:x.name,docId:x.id,groupId:selectedCity2.id}}/>
            ))

            }
                </div>
        );
    }
    
    return(
        <>
        { pageRole=="supervisor" ? 
        <div className='Page'>
            <Helmet>
        <title>Thesis Tracker | Documents</title>
        </Helmet>
            <div className='Sidebar'>
                <Sup_Sidebar />
            </div>
            <div className='Main'>
                <div style={{marginTop:'1rem',display:'flex',justifyContent:'center'}}>
                    <Dropdown value={selectedCity1} options={group} onChange={onCityChange} optionLabel="id" placeholder="Select a Group" />
                <Button label="Filter" onClick={FilterGroup} aria-label="Submit"  />
                </div>
            
                <OpenGroupDocs></OpenGroupDocs>
            </div>
        </div> : <Unauthorized></Unauthorized>}
        </>
    );
}