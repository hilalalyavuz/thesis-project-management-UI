import * as React from 'react';
import {useState, useRef, useEffect} from 'react'
import { DataGrid, GridSelectedRowCount, selectedGridRowsCountSelector, selectedGridRowsSelector } from '@mui/x-data-grid';
import Sidebar from '../components/Sidebar';
import '../css/Common.css'
import '../css/Documents.css'
import '../css/Table.css'
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card } from '@mui/material';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { Dialog } from 'primereact/dialog';
import DownloadIcon from '@mui/icons-material/Download';
import fileDownload from 'react-file-download'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;



const Table = (props) => {
    
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");
  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };

    const [deneme, setDeneme] = useState();
    

    const toast = useRef(null);

    //for rad
    const [selectedProduct1, setSelectedProduct1] = useState(null);
    const [selectedProduct2, setSelectedProduct2] = useState(null);
    const [rows, setRows] = useState([]);

    const onRowSelect = (event) => {
      setSelectedProduct1(event)
      if(event.length>selectedProduct2){
        toast.current.show({ severity: 'info', summary: 'RAD Selected', detail: `id: ${event}`, life: 3000 });
      }else{
        toast.current.show({ severity: 'warn', summary: 'RAD Unselected', life: 3000 });
      }
      setSelectedProduct2(event.length)
  }

  async function getData(){
    await axios.get(`https://localhost:7084/api/Student/GetDocument/${userEmail}/${props.data}`,config).then((result)=>{
      console.log(result.data)
        setRows(result.data);
    });
}

  useEffect(()=>{
    getData();

},[]);

  const deleteRow = () =>{
    console.log(selectedProduct1)
  }

    const Input = styled('input')({
      display: 'none',
    });

    
    const columns = [

        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'insert_date', headerName: 'Date', width: 180 },
        {
          field: 'feedback',
          headerName: 'Feedback',
          width: 530,
        },
        {
          field: 'status_id',
          headerName: 'Status',
          width: 150,
        }
      ];


  const [alert1,setAlert1]=React.useState(false);

      const uploadFile =async (event)=>{
        
        const nameoffile=props.data+"_"+event.target.files[0].name;

        const formData=new FormData();
        console.log(nameoffile);
        formData.append("formFile",event.target.files[0],nameoffile)
      
      await axios.post(`https://localhost:7084/api/User/a/${userEmail}`,formData).then(res => {
        toast.current.show({severity:'success', summary: 'File Uploaded', life: 3000});
        getData();
      }).catch(err => {
        toast.current.show({severity:'error', summary: 'Failed to upload', life: 3000});
      })
      
      }

      

      const [fileDown, setFileDown] = useState();
  const [docDialog, setDocDialog] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
      const downloadFile = async () => {
        await axios.get(`https://localhost:7084/api/User/b/${selectedProduct1}`,{ responseType: 'arraybuffer' }).then((res => {
          console.log(res);
          setFileDown({"data":res.data});
          setDocDialog(true);
        }))
        
      }

      const downloadFile2 = async () => {
        await axios.get(`https://localhost:7084/api/User/b/${selectedProduct1}`,{ responseType: 'arraybuffer' }).then((res => {
          console.log(res);
          var file_name;
          rows.map(x => {if(x.id == selectedProduct1){
            file_name = x.name;
          }})
          fileDownload(res.data, file_name);
        }))
        
      }

  



    return(
        <>
        
        <Toast ref={toast} />

        <Dialog className="dialDoc" visible={docDialog}  header="Document Details" modal onHide={()=>{setDocDialog(false)}}>

        <Document
        file={fileDown}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber}>
        
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      
        </Page>
      </Document>
        </Dialog>
       
        <Card className="card2" style={{width:'75%'}}>
        <div>
              <div className='table' style={{width:'100%'}}>
                              <h3>{props.data}</h3>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              onSelectionModelChange = {onRowSelect}
                                          />
                          </div>

                          <div className='tableButtons'>

                            <Button variant="outlined" onClick={deleteRow} startIcon={<DeleteIcon />}>
                              Delete
                            </Button>

                            <label htmlFor="contained-button-file">
                              <Input accept="pdf/*" id="contained-button-file" onChange={uploadFile} multiple type="file" />
                              <Button startIcon={<FileUploadIcon />} variant="contained" component="span">
                                Upload
                              </Button>
                            </label>

                            <Button variant="contained" onClick={downloadFile2} startIcon={<DownloadIcon />}>
                              Download
                            </Button>

                            <Button variant="contained" onClick={downloadFile} startIcon={<VisibilityIcon />}>
                              View
                            </Button>

                          </div>
            </div>
        </Card>
        
        
        </>
    )

}
export default Table;