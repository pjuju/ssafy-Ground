import './App.css';
import LoginPage from './pages/LoginPage';
import KakaoRedirectHandler from 'components/Login/OAuth/KakaoRedirectHandler';
import GoogleRedirectHandler from 'components/Login/OAuth/GoogleRedirectHandler';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/oauth/callback/google" element={<GoogleRedirectHandler />} />
        <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
