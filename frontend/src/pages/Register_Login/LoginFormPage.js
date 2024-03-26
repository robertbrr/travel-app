/* React */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Components */
import Navbar from "../MainPages/Navbar";

/* Utilities */
import * as userStorage from "../../utilities/UserSession";

/* Styles */
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
        <div className="login-page">
            <Navbar></Navbar>
            <div className={ "form-container-login" }>
                <h2> Enter credentials: </h2>
                <div className="form-style">{ renderLoginForm } </div>
            </div>
            <div className={ "copyright" }>Image by <a
                href="https://www.freepik.com/free-photo/composition-toy-airplane-passport-plant-leaves_4636248.htm#query=travel%20background&position=37&from_view=keyword&track=ais&uuid=62a6b086-5409-4903-96d2-1f1e0b1101c4">Freepik</a>
            </div>
        </div>
    );
    }

export default LogIn;