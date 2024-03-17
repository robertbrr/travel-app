import './styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/WelcomePages/MainPage';
import MainSidebar from './pages/WelcomePages/MainSidebar';


function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<>  <MainPage/> </>}/>
        <Route path="/home" element={<> <MainPage/> </>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
