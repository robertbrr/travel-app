import './styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePages/WelcomePage';
import MainSidebar from './pages/WelcomePages/MainSidebar';


function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<> <MainSidebar/> <WelcomePage/> </>}/>
        <Route path="/home" element={<> <MainSidebar/> <WelcomePage/> </>}/>
        </Routes>
      </BrowserRouter>  
  );
}

export default App;
