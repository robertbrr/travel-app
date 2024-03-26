/* React */
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

/* Components */
import Navbar from "../MainPages/Navbar";

/* Styles */
import "../../styles/styles.css"

const SignUp = () => {
    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ fullName, setFullName ] = useState( '' );
    const [ errMsg, setErrMsg ] = useState( '' );
    const navigate = useNavigate( '' );

    /* Handler for form submission */
    const SignUpHandler = async( e ) => 
        {
        e.preventDefault();
        
        /* Format for POST register request*/
        const requestOptions
          = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { username: username, password: password, name: fullName } )
            };

        /* Perform the request */
        fetch( 'http://localhost:8000/api/v1/register', requestOptions )
            .then( ( res ) => {
                if( !res.ok )
                    {
                    return( res.text().then(text => { throw new Error( text ? text : "Error" ) }) );
                    }
                alert( "Account created successfully." );
                navigate( "/login" );  
            })
            .catch( ( err ) => { 
                setErrMsg( String ( err.message ) ) 
            });
    }

    const renderSignUpForm                            /* Sign Up Form                 */
      = (
        <form onSubmit = { SignUpHandler }>

            <div className = "form-text-input" >
                <label className = 'form-centered-label'> Full Name </label>
                <input 
                    type = "form-text"
                    required 
                    onChange={ ( e ) => setFullName( e.target.value ) }/>
            </div>

            <div className = "form-text-input" >
                <label className = 'form-centered-label'> Username </label>
                <input 
                    type = "form-text"
                    required 
                    onChange={ ( e ) => setUsername( e.target.value ) }/>
            </div>

            <div className = "form-text-input" >
                <label className = 'form-centered-label'> Password </label>
                <input 
                    type = "password" 
                    required  
                    onChange={ ( e ) => setPassword( e.target.value ) }/>
            </div>

            <div className = "form-button-container">
                <input
                    type  = "submit"
                    value = "Sign Up"
                />
            </div>

            <div className = 'form-centered-label'>
                <Link to = "/login" >
                    <button type = "form-navigate"> Go back to login </button>
                </Link>
            </div>

            { errMsg && <div className = "form-err-msg"> { errMsg } </div> }
        </form>
        )

    return(
        <div className="register-page">
            <Navbar></Navbar>
            <div className={ "form-container-register" }>
                <h2> Fill in the form </h2>
                <div className="form-style">{ renderSignUpForm } </div>
            </div>
            <div className={ "copyright" }>Image by <a
                href="https://www.freepik.com/free-photo/composition-toy-airplane-passport-plant-leaves_4636248.htm#query=travel%20background&position=37&from_view=keyword&track=ais&uuid=62a6b086-5409-4903-96d2-1f1e0b1101c4">Freepik</a>
            </div>
        </div>
    );
}

export default SignUp;