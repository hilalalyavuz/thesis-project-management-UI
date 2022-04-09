import Sidebar from '../components/Sidebar';


const Home = () =>{

    return(
    <div style={{display:'flex',flexDirection:'row'}}>
        <div>
            <Sidebar />
        </div>
        <div>
            <h3>Anasayfa </h3>
        </div>

    </div>
    );
    
};

export default Home;