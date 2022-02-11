import React from 'react';

const UsernameWeb = () => {

    return(

      <div> 
         <center>
             <h2> Congratulations! you have successfully Signed up</h2>
             <hr/>
             <label className="label">
     <div>Please Enter a username:  </div>
     <input placeholder="Ahmad123" id="username" type="text"/>
     </label>
     <br/>
     <br/>
  <button style={{backgroundColor: 'lightblue' , color: 'white'}}>
      Check Avaliability
      </button>
         </center>
         </div>
         
     

    );
};
export default UsernameWeb;