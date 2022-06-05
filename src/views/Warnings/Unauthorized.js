const Unauthorized =()=>{

    return(
        
        <div className="main" style={{display:'flex',backgroundColor:'#83D9C8',flexDirection:'column',alignItems:'center',height:'100vh'}}>

        <img  style={{height:'30rem',width:'fit-content'}} src="https://i.imgur.com/qIufhof.png"></img>
        <h3 style={{color:'#965418'}}>Caution! This Page is Cordoned Off</h3>
        <p style={{color:'#965418',width:'60%'}}>The earthquake was not good to the bike lane on your way to work. A large gap in the pavement (too big to be called a pothole) had swallowed three oblivious bikers whole. So the city had put up two pylons and yellow caution tape. Pretty frustrating for you given your propensity to do 360 jumps over the gap.</p>
        </div>
        
    );
};
export default Unauthorized;