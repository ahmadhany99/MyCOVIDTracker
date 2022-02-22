import { BrowserRouter, Route, Link } from "react-router-dom";
import React from 'react';
import {Field, reduxForm} from 'redux-form';




class Login extends React.Component{

  renderError({error,touched}){
    if(touched &&error){
        return(
    <div className="ui error message">
        <div className="header">{error}</div>
    </div>
        );
    }
        }
    
        renderInput= ({input, label, meta})=>{
            const className=`field ${meta.error&&meta.touched ? 'error': ''}`
    return (
        <div className={className}>
            <label>{label}</label> 
    <input {...input}/> 
    {this.renderError(meta)}
    </div>
    );
        }
    
        onSubmit(formValues){
         console.log(formValues);
        }

render(){

  
      return(
        <div>
        <center>
            <h1 style ={{backgroundColor: 'lightblue' , color: 'white'}}> Login</h1>
       
            </center>
            <br/>
            <br/>
<form onSubmit={this.props.handleSubmit(this.onSubmit)}className="ui form error">
            <Field 
            name="Username" 
            component={this.renderInput} 
            label="Enter Username"
            />
            <Field 
            name="Password" 
            component={this.renderInput} 
            label = "Enter Password:"
            />

            <Link to ="/BlankPage">
            <center>
<button className="ui button primary">Login</button>   
</center>
</Link>
             </form>
             </div>
      );
} ;
}
const validate = (formValues) =>{
  const error={};
  if(!formValues.Username){
      // only ran if user didn't enter title
  error.Username = 'you must enter a username';
  }
  if(!formValues.Password){
      error.Password = 'you must enter a password';
  }
  else if((formValues.Password&&formValues.Username)!="Ahmad123"){
    error.Password = 'You entered wrong username or passsword';
  }
  return error;
}
export default reduxForm({
  form:'Login',
  validate
})(Login);

