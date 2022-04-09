import Sidebar from '../components/Sidebar';
import '../css/Common.css'


const Home = () =>{

    return(
    <div className='Page'>

        <div className='Sidebar'>
            <Sidebar />
        </div>

        <div className='Main'>
            <h3 style={{height:'100rem'}}>Anasayfa </h3>
        </div>

    </div>
    );
    
};

export default Home;