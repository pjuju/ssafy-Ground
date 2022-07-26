import './App.css';
import LoginPage from './pages/LoginPage';
import KakaoRedirectHandler from 'components/Login/OAuth/KakaoRedirectHandler';
import GoogleRedirectHandler from 'components/Login/OAuth/GoogleRedirectHandler';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from 'pages/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/oauth/callback/google" element={<GoogleRedirectHandler />} />
        <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;