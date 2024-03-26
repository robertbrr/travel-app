import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import * as userStorage from "../../utilities/UserSession";
import "../../styles/styles.css"
import MainPage from "../MainPages/MainPage";
import Navbar from "../MainPages/Navbar";

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
            <div className = "form-text-input" >
                <label className = 'form-centered-label'> Username </label>
                <input 
                    type = "form-text"
                    required 
                    onChange={ ( e ) => setUsername( e.target.value ) }
                />
            </div>

            <div className = "form-text-input" >
            <label className = 'form-centered-label'> Password </label>
                <input 
                    type = "password"
                    required  
                    onChange={ ( e ) => setPassword( e.target.value ) } 
                />
            </div>
            

            <div className = "form-button-container" >
                <input
                    type  = "submit"
                    value = "Log In"
                />
            </div>

            <Link to = "/register">
                <button type = "form-navigate" > Click here to create an account </button>
            </Link>

            { errMsg && <div className = "form-err-msg"> { errMsg } </div> }
        </form>
        );

    return( 
            <div className = "main-page">
                <Navbar></Navbar>
                <div className = { "form-container" }>
                    <h2> Enter credentials: </h2>
                    <div className = "form-style">{ renderLoginForm } </div>
                </div>
            </div>
          );
    }

export default LogIn;