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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Message } from 'primereact/message';

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
    const [selectionModel, setSelectionModel] = useState();
    const [rows, setRows] = useState([]);
    var today = new Date();
    var passed = today.toISOString() > props.deadline;

    const onRowSelect = (event) => {
       if (event.length > 1) {
       const selectionSet = new Set(selectionModel);
       const result = event.filter((s) => !selectionSet.has(s));
       setSelectionModel(result);
       setSelectedProduct1(result);
      } else {
        setSelectionModel(event);
        setSelectedProduct1(event);
      }
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

  const deleteRow = async () =>{
    await axios.delete(`https://localhost:7084/api/Student/DeleteDocument/${selectedProduct1}`,config).then((result)=>{
      toast.current.show({ severity: 'warn', summary: 'Document Deleted', life: 3000 });
      getData();
    });
  }

  const markFinal = async () =>{
    
    await axios.get(`https://localhost:7084/api/Student/MarkFinalDocument/${userEmail}/${selectedProduct1}`,config).then((result)=>{
      if(result.data == false){
        toast.current.show({ severity: 'error', summary: 'Not Marked', life: 3000 });
        window.location.reload();
      }else{
        toast.current.show({ severity: 'warn', summary: 'Marked as final', life: 3000 });
        window.location.reload();
      }
      
    });
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
                              <div className="col-12 md:col-3">
                              <h3>{props.data}</h3>
                        <Message severity="warn" text={props.deadline.split('T')[0] + " / " + props.deadline.split('T')[1]} />
                    </div>
                              <DataGrid
                                              rows={rows}
                                              columns={columns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              checkboxSelection
                                              onSelectionModelChange = {onRowSelect}
                                              selectionModel = {selectionModel}
                                          />
                          </div>

                          <div className='tableButtons' style={{marginTop:'5rem'}}>


                          <Button variant="outlined" disabled={passed? true:false} id={props.data+'final'} onClick={markFinal} startIcon={<BookmarkIcon />}>
                              Final
                            </Button>

                            <Button variant="outlined" id={props.data+'delete'} onClick={deleteRow} startIcon={<DeleteIcon />}>
                              Delete
                            </Button>

                            <label htmlFor={props.data+'upload'}>
                              <Input disabled={passed? true:false} accept="pdf/*" id={props.data+'upload'} onChange={uploadFile} multiple type="file" />
                              <Button disabled={passed? true:false} startIcon={<FileUploadIcon />} variant="contained" component="span">
                                Upload
                              </Button>
                            </label>

                            <Button variant="contained" id={props.data+'download'} onClick={downloadFile2} startIcon={<DownloadIcon />}>
                              Download
                            </Button>

                            <Button variant="contained" id={props.data+'view'} onClick={downloadFile} startIcon={<VisibilityIcon />}>
                              View
                            </Button>

                          </div>
            </div>
        </Card>
        
        
        </>
    )

}
export default Table;