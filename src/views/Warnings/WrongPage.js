import notify from '../../img/notify.svg';
const Unauthorized =(props)=>{

    return(
        
        <div className="main" style={{display:'flex',backgroundColor:'white',flexDirection:'column',alignItems:'center',height:'100vh', justifyContent:'center'}}>

        <img  style={{height:'30rem',marginTop:'2rem',width:'fit-content'}} src={notify}></img>
        <h1 style={{color:'black'}}>{props.data}</h1>
        </div>
        
    );
};
export default Unauthorized;