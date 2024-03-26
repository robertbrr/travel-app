/* React */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Components */
import MainPage from './pages/MainPages/MainPage';
import DestinationsPage from "./pages/MainPages/DestinationsPage";
import ContactPage from "./pages/MainPages/ContactPage";
import LoginFormPage from "./pages/Register_Login/LoginFormPage";
import SignUpFormPage from "./pages/Register_Login/SignUpFormPage";

/* Styles */
// import './styles.css'

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path ="/" element={<> <MainPage/> </>}/>
            <Route path ="/home" element={<> <MainPage/> </>}/>
            <Route path ="/destinations" element={<> <DestinationsPage/> </>}/>
            <Route path ="/offers" element={<> <DestinationsPage/> </>}/>
            <Route path ="/contact" element={<> <ContactPage/> </>}/>
            <Route path ="/login" element={<> <LoginFormPage/> </>}/>
            <Route path ="/register" element={<> <SignUpFormPage/> </>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
