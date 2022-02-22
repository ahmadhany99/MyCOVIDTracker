import React from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
const HomePage = () => {

return(

<div>
<div className="row">
  <div className="side">
    <h2>What is Avaliable on the webs Ahmad Hany<br/>
        Amr Hefny<br/>
        Hadi Hawi<br/>
        Jasmine Lebel<br/>
        Mohana Mazumdar<br/>
        Sofyia Taver<br/>
        Micheal Laplaine-pereira<br/>
        Minh-Tam do<br/>
        Allan Lopezite?</h2>
    <h5>List of Specialists:</h5>
    <div className="fakeimg" style={{height: "200px"}}>
       
   </div>

    <h3>What you should do if you tested positive?</h3>
    <p></p>
    <div className="fakeimg" style={{height: "60"}}>SignUp, and record the date and time you became positive</div><br/>
    <div className="fakeimg" style={{height: "60px"}}>Follow the instructions, about the isolation requirements</div><br/>
    <div className="fakeimg" style={{height: "60px"}}>Feel Free to chat with a doctor or specialist, we are avaliable all day any time!</div>
  </div>
  <div className="main">
      <center>
    <h2><b>myCOVIDtracker</b></h2>
    </center>
    <br/>
    <center>
    <h5>Welcome to myCOVIDtracker, We hope you are COVID free!</h5>
    </center>
    <p></p>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
  
    <h3>myCovidTracker is a platform that helps
    us to track the number of patients who have COVID,
    and who were in direct contact with COVID patients.
    </h3><h3>
    The first thing a patient should do is to record thier positive result,
    in order for our doctors to contact them!.</h3>
    <h3>
    This platform counts the number of recovered patients, and the period of isolation a patient should stay at home!</h3>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <center>
    <h3>
       <b> We try to keep this world safe !</b>
    </h3>
    </center>
    
  </div>
</div>

<div className="footer">
  <h2>Feel free to contact us, We are Avaliable 24 hours- Our Phone Number is (514-553-4360)</h2>
</div>


</div>


);


};
export default HomePage;