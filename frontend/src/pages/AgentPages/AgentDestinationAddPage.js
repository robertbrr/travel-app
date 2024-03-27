import Navbar from "../MainPages/Navbar";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { isAgentLoggedIn } from "../../utilities/UserSession";


function AgentDestinationAddPage()
    {

    const navigate = useNavigate()
    const [ errMsg, setErrMsg ] = useState( '' )

    const [ name, setName ] = useState( '' )
    const [ location, setLocation ] = useState( '' )
    const [ price, setPrice ] = useState( '' )
    const [ offer, setOffer ] = useState( '' )
    const [ spots, setSpots ] = useState( '' )

    const AddHandler = async( e ) =>
        {
        e.preventDefault();

        /* Format for POST register request*/
        const requestOptions
            = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    name: name,
                    location: location,
                    price_nightly: price,
                    percentage_offer: offer,
                    spots_available: spots
                })
        };

        /* Perform the request */
        fetch( `http://localhost:8000/api/v1/destinations`, requestOptions )
            .then( ( res ) => {
            if( !res.ok )
                {
                return( res.text().then(text => { throw new Error( text ? text : "Error" ) }) );
                }
            })
            .then( () => {
                alert( "Destination created successfully." );
                navigate( "/destinations", { replace: true } );
            })
                .catch( ( err ) => {
                setErrMsg( String( err.message ) )
            })
        }

    const renderDestinationEditForm
        = (
        <form onSubmit={ AddHandler }>
            <div className="form-text-input">
                <label className='form-centered-label'> Name </label>
                <input
                    type="form-text"
                    required
                    value = { name }
                    onChange={ ( e ) => setName( e.target.value ) }
                />
            </div>

            <div className="form-text-input">
                <label className='form-centered-label'> Location </label>
                <input
                    type="form-text"
                    required
                    value = { location }
                    onChange={ ( e ) => setLocation( e.target.value ) }
                />
            </div>

            <div className="form-text-input">
                <label className='form-centered-label'> Price per night </label>
                <input
                    type="form-text"
                    required
                    value = { price }
                    onChange={ ( e ) => setPrice( e.target.value ) }
                />
            </div>

            <div className="form-text-input">
                <label className='form-centered-label'> Offer </label>
                <input
                    type="form-text"
                    required
                    value = { offer }
                    onChange={ ( e ) => setOffer( e.target.value ) }
                />
            </div>

            <div className="form-text-input">
                <label className='form-centered-label'> Spots available </label>
                <input
                    type="form-text"
                    required
                    value = { spots }
                    onChange={ ( e ) => setSpots( e.target.value ) }
                />
            </div>

            <div className="form-button-container">
                <input
                    type="submit"
                    value="Submit"
                />
            </div>

            { errMsg && <div className="form-err-msg"> { errMsg } </div> }
        </form>
    );

    return (
        <div className={ "destinations-page" }>
            <Navbar></Navbar>
            {
            isAgentLoggedIn() &&
            <div className={ "form-container-edit-dest" }>
                <h3> Add destination </h3>
                <div className="form-style">{ renderDestinationEditForm } </div>
            </div>
            }
        </div>
        );
    }

export default AgentDestinationAddPage