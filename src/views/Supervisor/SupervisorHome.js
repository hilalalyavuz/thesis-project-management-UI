import Sup_Sidebar from '../../components/Sup_Sidebar';
import { Helmet } from 'react-helmet';

export default function SupervisorHome(){

    return(
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
        </div>
    );

}