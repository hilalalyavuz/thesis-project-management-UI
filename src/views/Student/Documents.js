import * as React from 'react';
import {useState, useRef, useEffect} from 'react'
import { DataGrid, GridSelectedRowCount, selectedGridRowsCountSelector, selectedGridRowsSelector } from '@mui/x-data-grid';
import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table'
import '../../css/Common.css'
import '../../css/Documents.css'
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { display } from '@mui/system';
import axios from 'axios';
import { Helmet } from 'react-helmet';





export default function Documents() {
    
  const[header, setHeader] = useState([]);
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");
  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };

  useEffect(()=>{
    async function getData(){
        await axios.get(`https://localhost:7084/api/User/GetDocumentType/${userEmail}`,config).then((result)=>{
            setHeader(result.data);
        });
    }
    getData();

},[]);
  


  
  return (
    <div className='Page'>
      
<Helmet>
        <title>Thesis Tracker | Documents</title>
      </Helmet>

        <div className='Sidebar'>
            <Sidebar dname="Documents"/>
        </div>
        
        <div className='Main'>
          <div className='Main2'>
            {header.map(x => (
              <Table data={x.name}/>
            ))

            }
          </div>
          
            


        </div>

    </div>
    
  );
}