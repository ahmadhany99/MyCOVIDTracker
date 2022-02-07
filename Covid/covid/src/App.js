import React from 'react';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import UsernameWeb from './Components/UsernameWeb';
import Login from './Login';
import Header from './Header';
import Admin from './Components/Admin';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends React.Component{

render(){
    return(
   <div>
    
       
       <BrowserRouter>
       <Header />
       <Route path="/" exact component= {HomePage}/>
       <Route path="/Signup" exact component= {Signup}/>
       <Route path="/Login" exact component= {Login}/>
       <Route path="/UsernameWeb" exact component = {UsernameWeb} />
       <Route path="/Admin" exact component = {Admin} />

       </BrowserRouter>
       
       </div>

    );
   };
   }export default App;