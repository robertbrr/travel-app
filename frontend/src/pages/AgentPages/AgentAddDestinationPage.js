// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
//
//
// import * as userStorage from "../../utilities/UserStorage";
//
// import '../../styles.css';
//
// const AgentAddDestinationPage = () => {
//     const [ description, setDescription ] = useState('');
//     const [ address, setAddress ] = useState( '' );
//     const [ maxEnergyConsumption, setMaxEnergyConsumption ] = useState( '' );
//
//     const [ client, setClient ] = useState( { id: '', name: '' } )
//     const [ clientChooser, setClientChooser ] = useState( false )
//
//     const [ errMsg, setErrMsg ] = useState(null);
//
//     const navigate = useNavigate();
//
//     /* Handler for showing pop up */
//     const setPopUpVisibility = () =>
//         {
//         setClientChooser( true )
//         }
//
//     /* Handler for form submission */
//     const AddDestinationHandler = async(e) =>
//         {
//         e.preventDefault();
//
//         /* Format for POST register request*/
//         const requestOptions
//           = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStorage.getCurrentUserData().token}` },
//             body: JSON.stringify(
//                 {
//                 description: description,
//                 address: address,
//                 maxEnergyConsumption: maxEnergyConsumption,
//                 userID: client.id
//                 }
//                 )
//             };
//
//         /* Perform the request */
//         fetch( 'http://localhost:8081/api/v1/devices', requestOptions )
//             .then( ( res ) => {
//                 if( !res.ok )
//                     {
//                     return( res.text().then(text => { throw new Error( text ? text : "Error" ) }) );
//                     }
//             })
//             .then( () => {
//                 alert( "Destination created successfully." );
//             })
//             .catch( ( err ) => {
//                 setErrMsg( String( err.message ) )
//             });
//     }
//
//     const renderDeviceForm                             /* Device Form                 */
//       = (
//         <form onSubmit = { AddDestinationHandler }>
//
//             <div className = "text-input" >
//                 <label className = 'centered-label'> Description </label>
//                 <input
//                     type = "text"
//                     required
//                     onChange={ ( e ) => setDescription( e.target.value ) }/>
//             </div>
//
//             <div className = "text-input" >
//                 <label className = 'centered-label'> Address </label>
//                 <input
//                     type = "text"
//                     required
//                     onChange={ ( e ) => setAddress( e.target.value ) }/>
//             </div>
//
//             <div className = "text-input" >
//                 <label className = 'centered-label'> Max Energy Consumption ( kW/h ) </label>
//                 <input
//                     type = "text"
//                     required
//                     onChange={ ( e ) => setMaxEnergyConsumption( e.target.value ) }/>
//             </div>
//
//             <div className = "text-input" >
//                 <label className = 'centered-label'> Assign client </label>
//                 <input
//                     type = "text"
//                     value = { client.name }
//                     readOnly
//                     required />
//                 <button
//                     type = "button"
//                     onClick = { setPopUpVisibility }
//                 >
//                 Choose
//                 </button>
//             </div>
//
//             { errMsg && <div className = "err-msg"> { errMsg } </div> }
//
//             <div className = "button-container">
//                 <input
//                     type  = "submit"
//                     value = "Add device"
//                 />
//             </div>
//
//             <div className = 'centered-label'>
//                 <Link to = "/admin/devices" >
//                     <button type = "admin-devices-redirect"  >Go back to users page</button>
//                 </Link>
//             </div>
//         </form>
//
//         )
//
//     return(
//         <div className = 'add-device-container' >
//             <h1>Fill in the form:</h1>
//             <div className = "form-style">{ renderDeviceForm } </div>
//             <ClientsPopUpView
//                 visible = { clientChooser }
//                 setVisible = { setClientChooser }
//                 setSelectedClient = { setClient }
//             >
//             </ClientsPopUpView>
//         </div>
//         );
//     }
//
// export default AgentAddDestinationPage;