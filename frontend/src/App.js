/* React */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Components */
import MainPage from './pages/MainPages/MainPage';
import DestinationsPage from "./pages/MainPages/DestinationsPage";
import ContactPage from "./pages/MainPages/ContactPage";

/* Styles */
import './styles/styles.css'

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<> <MainPage/> </>}/>
        <Route path="/home" element={<> <MainPage/> </>}/>
        <Route path="/destinations" element={<> <DestinationsPage/> </>}/>
        <Route path="/offers" element={<> <DestinationsPage/> </>}/>
        <Route path="/contact" element={<> <ContactPage/> </>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
