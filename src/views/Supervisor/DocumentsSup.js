import Sup_Sidebar from '../../components/Sup_Sidebar';
import SupTableDoc from '../../components/SupTableDoc';
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Helmet } from 'react-helmet';

export default function DocumentSup(){
    
    const hh = ["deniz","hilal","gds","hy"];
    const [selectedCity1, setSelectedCity1] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }
    
    return(
        <div className='Page'>
            <Helmet>
        <title>Thesis Tracker | Documents</title>
        </Helmet>
            <div className='Sidebar'>
                <Sup_Sidebar />
            </div>
            <div className='Main'>
                <div style={{marginTop:'1rem',display:'flex',justifyContent:'center'}}>
                    <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select a Group" />
                <Button label="Filter" aria-label="Submit"  />
                </div>
            
                <div className='' style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                {hh.map(x => (
              <SupTableDoc data={x}/>
            ))

            }
                </div>
            </div>
        </div>
    );
}