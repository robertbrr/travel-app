import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

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

            <div className = "text-input" >
                <label className = 'centered-label'> Full Name </label>
                <input 
                    type = "text" 
                    required 
                    onChange={ ( e ) => setFullName( e.target.value ) }/>
            </div>

            <div className = "text-input" >
                <label className = 'centered-label'> Username </label>
                <input 
                    type = "text" 
                    required 
                    onChange={ ( e ) => setUsername( e.target.value ) }/>
            </div>

            <div className = "text-input" >
                <label className = 'centered-label'> Password </label>
                <input 
                    type = "password" 
                    required  
                    onChange={ ( e ) => setPassword( e.target.value ) }/>
            </div>

            { errMsg && <div className = "err-msg"> { errMsg } </div> }

            <div className = "button-container">
                <input 
                    type  = "submit" 
                    value = "Sign Up"
                />
            </div>

            <div className = 'centered-label'>
                <Link to = "/login" >
                    <button type = "log-in-redirect"> Go back to login </button>
                </Link>
            </div>
        </form>
        )

    return( 
        <div className = "app">
            <h1> Fill in the form </h1>
            <div className = "form-style">{ renderSignUpForm } </div>
        </div> 
        );
    }

export default SignUp;