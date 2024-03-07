import './styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePages/WelcomePage';


function App() {
  return (
    <div className = 'main-app'>
      <BrowserRouter>
        <Routes>
          <Route path = '/'         element = { <WelcomePage /> } />
          <Route path = '/home'     element = { <WelcomePage /> } />
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
