import React from 'react';
import {Link} from 'react-router-dom';
import GoogleAuth from './Components/GoogleAuth';

const Header = ()=> {

    return(

        <div className="ui menu ">
        <div className="item ">
        <div class="ui button">
        <Link to="/" className=" item">
               Homepage
                </Link>
      </div>
            <div class="item">
    <div class="ui button"><Link to="/Login" className="item">
               Login
                </Link>
                </div>
  </div>
  <div class="item">
    <div class="ui button"><Link to ="/Signup" className="item">
            Signup
        </Link>
    </div>
  </div>
  
  <GoogleAuth/>
</div>
</div>


    );
};
export default Header;