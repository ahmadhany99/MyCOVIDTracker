import React from 'react';
import './Signup.css';
import {Link} from "react-router-dom";
import {Field, reduxForm} from 'redux-form';


class Signup extends React.Component {

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
<input {...input} autoComplete ="Off"/> 
{this.renderError(meta)}
</div>
);
    }

    onSubmit(formValues){
        console.log(formValues);
       }
   
    
    render(){
    return (
<div>
    <center>
<h1 style={{backgroundColor: 'lightblue' , color: 'white'}}> Sign Up</h1>
</center>
<div className="Signup">
<form onSubmit={this.props.handleSubmit(this.onSubmit)}className="ui form error">
            <Field 
            name="firstName" 
            component={this.renderInput} 
            label="Enter First Name:"
            />
            <Field 
            name="lastName" 
            component={this.renderInput} 
            label = "Enter Last Name:"
            />
               <Field 
            name="email" 
            component={this.renderInput} 
            label = "Enter Email:"
            />
               <Field 
            name="password" 
            component={this.renderInput} 
            label = "Enter Password:"
            type="password"
            placeholder="Ahmad123"
            />
               <Field 
            name="Reenterpassword" 
            component={this.renderInput} 
            label = "Re-enter Password:"
            />
              <Link to ="/UsernameWeb">
              <center>
            <button className="ui button primary">SignUp
            </button>
            </center>
            </Link>
        </form>
        </div>
    <div >
 <div className="Signup">


  </div>
  </div>
  <div> 
      </div>
      </div>
    );
};
}
const validate = (formValues) =>{
    const error={};
    if(!formValues.firstName){
        // only ran if user didn't enter title
    error.firstName = 'you must enter at first Name';
    }
    if(!formValues.lastName){
        error.lastName = 'you must enter a last Name';
    }
    if(!formValues.email){
        error.email = 'you must enter an Email';
    }
    if(!formValues.password){
        error.password = 'you must enter a password';
    }
    if(!formValues.Reenterpassword){
        error.Reenterpassword = 'you must re-enter your password';
    }
    return error;
}
export default reduxForm({
    form:'Signup',
    validate
})
   (Signup) ;

