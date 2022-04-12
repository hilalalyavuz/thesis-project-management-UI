import * as React from 'react';
import {useState, useRef} from 'react'
import { DataGrid, GridSelectedRowCount, selectedGridRowsCountSelector, selectedGridRowsSelector } from '@mui/x-data-grid';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table'
import '../css/Common.css'
import '../css/Documents.css'
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






export default function Documents() {
    
  const hh = ["deniz","hilal","gds","hy"]


  
  return (
    <div className='Page'>

        <div className='Sidebar'>
            <Sidebar/>
        </div>
        
        <div className='Main'>
          <div className='Main2'>
            {hh.map(x => (
              <Table data={x}/>
            ))

            }
          </div>
          
            


        </div>

    </div>
    
  );
}