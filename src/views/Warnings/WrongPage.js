const Unauthorized =(props)=>{

    return(
        
        <div className="main" style={{display:'flex',backgroundColor:'#D5E9F6',flexDirection:'column',alignItems:'center',height:'100vh'}}>

        <img  style={{height:'30rem',marginTop:'2rem',width:'fit-content'}} src="https://i.imgur.com/DWO5Hzg.png"></img>
        <h3 style={{color:'#DF245D'}}>{props.data}</h3>
        <p style={{color:'#DF245D',width:'60%'}}>You have been trying for ten minutes. It’s pretty late at night and pretty dark in your room. You reach over and flick on a lamp. You feel oh so stupid. The gap in the toy is a triangle and you only have the cylinder and cube pieces. In dismay you toss the toy aside. Curse your five year old’s inability to keep track of the triangle!</p>
        </div>
        
    );
};
export default Unauthorized;