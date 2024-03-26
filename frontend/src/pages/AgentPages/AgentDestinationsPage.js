// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
//
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
//
// import ClientsPopUpView from "./ClientsPopUpView";
//
// import * as userStorage from "../../UserStorage";
//
// import { ThemeProvider } from "@mui/material";
// import { StyledTable, StyledTableCell, StyledTableRow, reactTableTheme } from "../../styled";
// import "../../styles.css"
//
// function AdminDevicesView()
//     {
//     const [ editing, setEditing ] = useState( false );
//     const [ editingDevice, setEditingDevice ] = useState();
//
//     const [ deviceArray, setDeviceArray] = useState( [] );
//
//     const [ currentPageNumber, setCurrentPageNumber ] = useState( 1 );
//     const [ numberOfTotalPages, setNumberOfTotalPages ] = useState( 1 );
//
//     const [ clientChooser, setClientChooser ] = useState( false )
//
//     const [ errMsg, setErrMsg ] = useState();
//
//     /* Handler for showing pop-up */
//     const setPopUpVisibility = () =>
//         {
//         setClientChooser( true )
//         }
//
//     /* Handler for selecting client from pop-up */
//     const setClient = ( client ) =>
//         {
//         setEditingDevice(
//             {
//             id: editingDevice.id,
//             description : editingDevice.description,
//             address: editingDevice.address,
//             maxEnergyConsumption: editingDevice.maxEnergyConsumption,
//             user: client
//             })
//         }
//
//     /* HTTP requests */
//     const getAllDevices = ( page ) =>
//         {
//         const requestOptions
//         =  {
//             method: 'GET',
//             headers: {'Authorization': `Bearer ${userStorage.getCurrentUserData().token}` },
//             };
//
//         fetch( `http://localhost:8081/api/v1/devices?page=${ page - 1 }`, requestOptions )
//             .then( ( res ) => {
//                 if( !res.ok )
//                     {
//                     return( res.text().then( text => { throw new Error( text ? text : "Error" ) } ) );
//                     }
//                 return( res.json() );
//             })
//             .then( ( res ) => {
//                 setDeviceArray( res.content );
//                 setNumberOfTotalPages( res.totalPages )
//             })
//             .catch( ( err ) => {
//                 setErrMsg( String( err ) );
//                })
//         }
//
//     const updateDevice = () =>
//         {
//         const requestOptions
//          =  {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStorage.getCurrentUserData().token}` },
//             body: JSON.stringify(
//                 {
//                 id: editingDevice.id,
//                 description: editingDevice.description,
//                 address: editingDevice.address,
//                 maxEnergyConsumption: editingDevice.maxEnergyConsumption,
//                 userID: editingDevice.user.id
//                 })
//             };
//
//         fetch( `http://localhost:8081/api/v1/devices`, requestOptions )
//             .then( () => {
//                 getAllDevices( currentPageNumber )
//             })
//             .catch( ( err ) => {
//                 setErrMsg( String( err ) );
//             })
//         }
//
//     const deleteDevice = ( id ) =>
//         {
//         const requestOptions
//          =  {
//             method: 'DELETE',
//             headers: { 'Authorization': `Bearer ${userStorage.getCurrentUserData().token}` }
//             };
//
//         fetch( `http://localhost:8081/api/v1/devices/${ id }`, requestOptions )
//             .then( () => {
//                 getAllDevices( currentPageNumber )
//             })
//             .catch( ( err ) => {
//                 setErrMsg( String( err ) );
//             })
//         }
//
//     /* Get all apointments when first rendering page */
//     useEffect( () => { getAllDevices( currentPageNumber ) }, [] );
//
//     /* Table button handlers */
//     const ChangePageHandler = ( _ , nextPageNumber ) =>
//         {
//         setCurrentPageNumber( nextPageNumber );
//         getAllDevices( nextPageNumber );
//         };
//
//     const EditHandler = ( deviceItem ) =>
//         {
//         setEditing( true );
//         setEditingDevice( deviceItem );
//         }
//
//     const SaveHandler = () =>
//         {
//         updateDevice();
//         setEditing( false );
//         setEditingDevice( null );
//         }
//
//     const CancelHandler = () =>
//         {
//         setEditing( false );
//         setEditingDevice( null );
//         }
//
//     const DeleteHandler = ( id ) =>
//         {
//         if( window.confirm( 'Delete selected user?' ) )
//             {
//             deleteDevice( id );
//             }
//         }
//
//     return (
//         <div className = "centered-page-content" >
//             <h2 className = "centered-label"> All Devices </h2>
//             { errMsg && <div className = "err-msg"> { errMsg } </div> }
//             <ThemeProvider theme = { reactTableTheme }>
//                     <TableContainer className = 'table-container'>
//                         <StyledTable>
//                             <TableHead>
//                                 <TableRow>
//                                     <StyledTableCell align = "center"> Product Description </StyledTableCell>
//                                     <StyledTableCell align = "center"> Address </StyledTableCell>
//                                     <StyledTableCell align = "center"> Maximum energy consumption&nbsp;<br />( kW/h )&nbsp;&nbsp; </StyledTableCell>
//                                     <StyledTableCell align = "center"> User </StyledTableCell>
//                                     <StyledTableCell align = "center"> Choose an option </StyledTableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {
//                                 deviceArray &&
//                                 deviceArray.map( ( deviceItem ) =>
//                                     ( editing && ( editingDevice.id === deviceItem.id ) ) ?
//                                     <StyledTableRow key = { deviceItem.id }>
//
//                                         <StyledTableCell align = "center">
//                                             <input
//                                                 type = 'text'
//                                                 value = { editingDevice.description }
//                                                 onChange = { ( event ) =>
//                                                     setEditingDevice(
//                                                         {
//                                                             id: editingDevice.id,
//                                                             description : event.target.value,
//                                                             address: editingDevice.address,
//                                                             maxEnergyConsumption: editingDevice.maxEnergyConsumption,
//                                                             user: editingDevice.user
//                                                         }
//                                                     )
//                                                 }
//                                             />
//                                         </StyledTableCell>
//
//                                         <StyledTableCell align = "center">
//                                             <input
//                                                 type = 'text'
//                                                 value = { editingDevice.address }
//                                                 onChange = { ( event ) =>
//                                                     setEditingDevice(
//                                                         {
//                                                             id: editingDevice.id,
//                                                             description : editingDevice.description,
//                                                             address: event.target.value,
//                                                             maxEnergyConsumption: editingDevice.maxEnergyConsumption,
//                                                             user: editingDevice.user
//                                                         }
//                                                     )
//                                                 }
//                                             />
//                                         </StyledTableCell>
//
//                                         <StyledTableCell align = "center">
//                                             <input
//                                                 type = 'text'
//                                                 value = { editingDevice.maxEnergyConsumption }
//                                                 onChange = { ( event ) =>
//                                                     setEditingDevice(
//                                                         {
//                                                             id: editingDevice.id,
//                                                             description: editingDevice.description,
//                                                             address: editingDevice.address,
//                                                             maxEnergyConsumption: event.target.value,
//                                                             user: editingDevice.user
//                                                         }
//                                                     )
//                                                 }
//                                             />
//                                         </StyledTableCell>
//
//                                         <StyledTableCell align = "center">
//                                             <input
//                                                 type = 'text'
//                                                 readOnly
//                                                 value = { editingDevice.user.name }
//                                             />
//                                             <button
//                                                 type = "button"
//                                                 onClick = { setPopUpVisibility }
//                                             >
//                                             Choose
//                                             </button>
//                                         </StyledTableCell>
//
//                                         <StyledTableCell align = 'center'>
//                                             <button
//                                                 onClick = { () => { SaveHandler() } }
//                                                 type = "save-btn"
//                                             >
//                                             Save
//                                             </button>
//
//                                             <button
//                                                 onClick = { () => { CancelHandler() } }
//                                                 type = "cancel-btn"
//                                             >
//                                             Cancel
//                                             </button>
//                                         </StyledTableCell>
//
//                                     </StyledTableRow>
//                                     :
//                                     <StyledTableRow key = { deviceItem.id }>
//                                         <StyledTableCell align = "center"> { deviceItem.description } </StyledTableCell>
//                                         <StyledTableCell align = "center"> { deviceItem.address } </StyledTableCell>
//                                         <StyledTableCell align = "center"> { deviceItem.maxEnergyConsumption } </StyledTableCell>
//                                         <StyledTableCell align = "center"> { deviceItem.user.name } </StyledTableCell>
//                                         { editing
//                                         ?
//                                         <StyledTableCell></StyledTableCell>
//                                         :
//                                         <StyledTableCell align = 'center' >
//                                             <button
//                                                 onClick = { () => { EditHandler( deviceItem ) } }
//                                                 type = "edit-btn"
//                                             >
//                                             Edit
//                                             </button>
//
//                                             <button
//                                                 onClick = { () => { DeleteHandler( deviceItem.id ) } }
//                                                 type = "delete-btn"
//                                             >
//                                             Delete
//                                             </button>
//                                         </StyledTableCell>
//                                         }
//                                     </StyledTableRow>
//                                     )
//                                 }
//                             </TableBody>
//                         </StyledTable>
//                     </TableContainer>
//                 <Stack style = { { alignItems: "center" } }>
//                     <Pagination count = { numberOfTotalPages }
//                                 page  = { currentPageNumber }
//                                 onChange = { ChangePageHandler }
//                     />
//                 </Stack>
//                 <Link to = "/admin/devices/add">
//                     <button
//                         type = "add-device"
//                     >
//                     Add device
//                     </button>
//                 </Link>
//             </ThemeProvider>
//
//             <ClientsPopUpView
//                 visible = { clientChooser }
//                 setVisible = { setClientChooser }
//                 setSelectedClient = { setClient }
//             >
//             </ClientsPopUpView>
//
//         </div>
//         );
//     }
//
// export default AdminDevicesView;
