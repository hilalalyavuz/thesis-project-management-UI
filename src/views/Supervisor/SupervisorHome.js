import Sup_Sidebar from '../../components/Sup_Sidebar';
import {useState, useRef, useEffect} from 'react'
import { Helmet } from 'react-helmet';
import Unauthorized from '../Warnings/Unauthorized';

export default function SupervisorHome(){

    const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));

    return(
        <>
        { pageRole=="supervisor" ? 
        <div className='Page'>
            <Helmet>
        <title>Thesis Tracker | Home</title>
            </Helmet>
            <div className='Sidebar'>
                <Sup_Sidebar />
            </div>
            <div className='Main'>
                <div className='Main2'>

                </div>
            </div>
        </div> : <Unauthorized></Unauthorized>}
        </>
    );

}