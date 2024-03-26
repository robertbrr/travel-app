import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import * as userStorage from "../../utilities/UserSession";
import "../../styles/styles.css"

function LogIn() 
    {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ errMsg, setErrMsg ] = useState('');    

    const navigate = useNavigate();

    useEffect( () => { userStorage.clearUserData() }, [] )

    /* Handler for form submission */
    const LogInHandler = async( e ) => 
        {
        e.preventDefault();
        
        /* Format for POST login request */
        const requestOptions 
         =  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { username: username, password: password } )
            };

        /* Perform the request */
        fetch( 'http://localhost:8000/api/v1/login', requestOptions )
            .then( ( res ) => {
                if( !res.ok )
                    {
                    return( res.text().then( text => { throw new Error( text ? text : "Error" ) } ) );
                    }
                return( res.json() );
            })
            .then( ( res ) => {

                /* Save logged in user data */
                userStorage.setCurrentUserData( { id: res[ 0 ].pk,
                                                       name: res[ 0 ].fields.name,
                                                       role: res[ 0 ].fields.role } );

                /* Go to corresponding page */
                navigate( "/home" );
            })
            .catch( ( err ) => {
                setErrMsg( String( err.message ) );
                userStorage.clearUserData();
            });
    }

    const renderLoginForm                           /* Login Form                   */
      = (
        <form onSubmit = { LogInHandler }>
            <div className = "text-input" >
                <label className = 'centered-label'> Username </label>
                <input 
                    type = "text"  
                    required 
                    onChange={ ( e ) => setUsername( e.target.value ) }
                />
            </div>

            <div className = "text-input" >
            <label className = 'centered-label'> Password </label>
                <input 
                    type = "password" 
                    required  
                    onChange={ ( e ) => setPassword( e.target.value ) } 
                />
            </div>
            
            { errMsg && <div className = "err-msg"> { errMsg } </div> }

            <div className = "button-container" >
                <input 
                    type  = "submit" 
                    value = "Log In"
                />
            </div>

            <Link to = "/register">
                <button type = "sign-up-redirect" > Click here to create an account </button>
            </Link>
        </form>
        );

    return( 
            <div className = "app">
                <h1> Enter credentials: </h1>
                <div className = "form-style">{ renderLoginForm } </div>
            </div> 
          );
    }

export default LogIn;