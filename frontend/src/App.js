/* React */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Components */
import MainPage from './pages/MainPages/MainPage';

/* Styles */
import './styles/styles.css'

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<> <MainPage/> </>}/>
        <Route path="/home" element={<> <MainPage/> </>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
