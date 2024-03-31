import Navbar from "../MainPages/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { isAgentLoggedIn } from "../../utilities/UserSession";


function AgentDestinationEditPage()
    {

    const { state: destination } = useLocation();
    const navigate = useNavigate()
    const [ errMsg, setErrMsg ] = useState( '' )

    const [ id, setId ] = useState( 0 )
    const [ name, setName ] = useState( '' )
    const [ location, setLocation ] = useState( '' )
    const [ price, setPrice ] = useState( '' )
    const [ offer, setOffer ] = useState( '' )
    const [ spots, setSpots ] = useState( '' )
    const [ path, setPath ] = useState( '' )


    useEffect( () =>
        {
        if( destination !== null )
            {
            setId( destination.pk )
            setName( destination.fields.name );
            setLocation( destination.fields.location );
            setPrice( destination.fields.price_nightly )
            setOffer( destination.fields.percentage_offer )
            setSpots( destination.fields.spots_available )
            setPath( destination.fields.path_img )
            }
        }, [] );

    const EditHandler = async( e ) =>
        {
        e.preventDefault();

        /* Format for POST register request*/
        const requestOptions
            = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                    {
                    id: id,
                    name: name,
                    location: location,
                    price_nightly: price,
                    percentage_offer: offer,
                    spots_available: spots,
                    path_img: path
                    })
        };

        /* Perform the request */
        fetch( `https://localhost:8000/api/v1/destinations`, requestOptions )
            .then( ( res ) => {
                if( !res.ok )
                    {
                    return( res.text().then(text => { throw new Error( text ? text : "Error" ) }) );
                    }
            })
            .then( () => {
                alert( "Destination edited successfully." );
                navigate( "/destinations", { replace: true } );
            })
                .catch( ( err ) => {
                setErrMsg( String( err.message ) )
            })
        }

    const renderDestinationEditForm
        = (
        <form onSubmit={ EditHandler }>
            <div className="form-text-input">
                <label className='form-centered-label'> Name </label>
                <input
                    type="form-text"
                    required
                    value={ name }
                    onChange={ ( e ) => setName( e.target.value ) }
                />
            </div>

            <div className="form-text-input">
                <label className='form-centered-label'> Location </label>
                <input
                    type="form-text"
                    required
                    value={ location }
                    onChange={ ( e ) => setLocation( e.target.value ) }
                />
            </div>

            <div className="form-text-input">
                <label className='form-centered-label'> Price per night </label>
                <input
                    type="form-text"
                    required
                    value={ price }
                    onChange={ ( e ) => setPrice( e.target.value ) }
                />
            </div>

            <div className="form-text-input">
                <label className='form-centered-label'> Offer </label>
                <input
                    type="form-text"
                    required
                    value={ offer }
                    onChange={ ( e ) => setOffer( e.target.value ) }
                />
            </div>

            <div className="form-text-input">
                <label className='form-centered-label'> Spots available </label>
                <input
                    type="form-text"
                    required
                    value={ spots }
                    onChange={ ( e ) => setSpots( e.target.value ) }
                />
            </div>

            <div className="form-text-input">
                <label className='form-centered-label'> Image URL </label>
                <input
                    type="form-text"
                    required
                    value={ path }
                    onChange={ ( e ) => setPath( e.target.value ) }
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
                isAgentLoggedIn() && destination &&
                <div className={ "form-container-edit-dest" }>
                    <div className="form-style">{ renderDestinationEditForm } </div>
                </div>
            }
        </div>
    );
    }

export default AgentDestinationEditPage