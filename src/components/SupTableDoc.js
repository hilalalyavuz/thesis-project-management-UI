import React, { useState , useEffect, useRef} from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from '@mui/material';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function SupTableDoc(props){

    const [selectedCity1, setSelectedCity1] = useState(null);
    const [doc,setDoc] = useState(null);
    const [docDialog, setDocDialog] = useState(false);
    const [value1, setValue1] = useState("");
    const [stat,setStat] = useState(null);
    const [rating,setRating] = useState(null);
    const toast = useRef(null);
    const [rows, setRows] = useState([]);
    let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");
  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };

  async function getData(){
    await axios.get(`https://localhost:7084/api/Supervisor/GetDocument/${props.data.docId}/${props.data.groupId}`,config).then((result)=>{
        result.data.map(x => {
            if(x.is_final == 1){
                x.is_final = "Yes";
            }else{
                x.is_final = "No";
            }
        })
        setRows(result.data);
    });
}
    useEffect(()=>{
        
        getData();
    },[]);
   

   
  

    const status = [{name: 'accepted'},{name: 'rejected'}]

  

    const actionEdit = (rowData) => {
        return(
            <React.Fragment>
               <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editDoc(rowData)} />
            </React.Fragment>
        );
    }
    const [current, setCurrent] = useState(null);
    const actionView = (rowData) => {
        setCurrent(rowData);
        return(
            <Button variant="contained" onClick={downloadFile} startIcon={<VisibilityIcon />}>
                              View
                            </Button>
        );
    }

    const editDoc = (doc) =>{
        setDoc({...doc});
        setDocDialog(true);
    }

    const UpdateDoc = async () => {
        await axios.patch(`https://localhost:7084/api/Supervisor/UpdateDocument/${doc.id}`,{
            "feedback": value1,
            "status": stat.name
        },config).then((result)=>{
            toast.current.show({ severity: 'info', summary: 'Updated', life: 3000 });
            getData();
            setDocDialog(false);
        });
    }
    const [fileDown, setFileDown] = useState();
    const [docDialog2, setDocDialog2] = useState(false);
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
        await axios.get(`https://localhost:7084/api/User/b/${current.id}`,{ responseType: 'arraybuffer' }).then((res => {
          console.log(res);
          setFileDown({"data":res.data});
          setDocDialog2(true);
        }))
        
      }

    const docDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDocDialog(false)}} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={UpdateDoc}/>
        </React.Fragment>
    );

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    
    return(
        <>
        <Toast ref={toast} />
            <Dialog className="dialDoc" visible={docDialog2}  header="Document Details" modal onHide={()=>{setDocDialog2(false)}}>

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
        <div style={{width:'80%'}}>
            <div >
                <div>
                <h3>{props.data.groupId == undefined ? props.data.name:props.data.name+" Group "+props.data.groupId}</h3>
                </div>
                <div>
                    <Card>
                        <DataTable value={rows} paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                        <Column field="feedback" header="Feedback" style={{ width: '25%' }}></Column>
                        <Column field="insert_date" header="Date" style={{ width: '25%' }}></Column>
                        <Column field="status_id" header="Status" style={{ width: '25%' }}></Column>
                        <Column field="is_final" header="Final" style={{ width: '25%' }}></Column>

                        <Column header="Edit" body={actionEdit}></Column>
                        <Column header="View" body={actionView}></Column>
                        </DataTable>
                    
                    </Card>
                   <Dialog visible={docDialog} style={{ width: '450px' }} header="Document Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDocDialog(false)}}>
                <div className="field">
                    <label htmlFor="name">{doc ? doc.name:null}</label>
                </div>
                <div className="field">
                    <label htmlFor="stat">Status</label>
                    <Dropdown value={stat} options={status} onChange={(e)=>{setStat(e.value)}} optionLabel="name" placeholder="Select a Status" />
                </div>
                <div className="field">
                    <label htmlFor="feedback">Feedback</label>
                    <InputTextarea id="feedback" onChange={(e) => setValue1(e.target.value)} required rows={3} cols={20} />
                </div>

                </Dialog> 
                </div>
            </div>
        </div>
        </>
    );
}